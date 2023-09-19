import mongoose from "mongoose";
import ObjectId from "mongoose";
import { RequestError } from "../error";
import { getBodyAsJson } from "../request_util";
import { Review, ReviewVote, User } from "../schema";
import { Controller } from "./controller";
import { authorize, getTokenFromRequest, getUsernameFromRequest, getUsernameFromToken } from "./auth/auth";
import { StatusCodes } from "http-status-codes";


export class ReviewController extends Controller {
    constructor(mapping: string) {
        super(mapping);

        this.addPath("GET", "/{id}", this.getCocktailReviews);

        this.addPath("POST", "", this.postReview);
        this.addPath("POST", "/{id}/{vote}", this.voteReview);
    }

    async postReview(req: Request): Promise<Response> {
        let username = authorize(req);

        let reviewBody = await getBodyAsJson<Review>(req);
        reviewBody.reviewerName = username;

        let review = new Review(reviewBody);

        await review.save()
            .catch(e => {
                if (e instanceof mongoose.Error.ValidationError) {
                    let message = Object.values(e.errors).map(e => e.message || "").join(" ");
                    throw new RequestError(message, 400)
                }

                throw new RequestError("Something went wrong", 500);
            });

        return new Response(JSON.stringify(review));
    }

    async getCocktailReviews(req: Request, cocktailIdParam: string) {
        let cocktailId = +cocktailIdParam;

        if (!cocktailId) {
            throw new RequestError(`Path variable id: '${cocktailId}' should be a number`, 400);
        }

        let reviews = await Review.find({ cocktailId }).exec();
        let response: {review: Review, vote: Vote}[];

        let username = getUsernameFromRequest(req);

        if (username) {
            let userVotes: {[key: string]: number} = {};

            (await ReviewVote.find({ username: username, cocktail_id: cocktailId }).exec())
                .forEach(v => userVotes[v.review_id] = v.amount);

            response = reviews.map(review => {
                return { review, vote: userVotes[review._id.toString()] | Vote.NONE }
            })
        } else {
            response = reviews.map(review => { return { review, vote: Vote.NONE }; });
        }

        return new Response(JSON.stringify(response));
    }

    
    //
    //  votePrev   voteNow   voteNew 
    //     x          x         -1
    //     x          y          y
    //
    //  userPrev   userNew    newVotes
    //     x          x          +0
    //     0          x          +x 
    //
    //     1          0          -1
    //     1         -1          -2
    //    -1          1          +2
    //    -1          0          +1
    //    
    //    newValue += new - prev
    async voteReview(req: Request, idParam: string, voteParam: string): Promise<Response> {
        let username = authorize(req);

        let vote = voteFromString(voteParam);

        if (vote == undefined || vote == Vote.NONE) {
            throw new RequestError(
                `Vote parameter is not right. Possible values are id/[down | up]`,
                StatusCodes.BAD_REQUEST
            );
        }

        let review = await Review.findById(idParam).exec();

        if (!review) {
            throw new RequestError(
                "Could not find review",
                StatusCodes.NOT_FOUND
            );
        }

        let reviewVote =
            await ReviewVote.findOne({ username, review_id: idParam }).exec() ||
            new ReviewVote({
                amount: Vote.NONE,
                username,
                review_id: idParam,
                cocktail_id: review.cocktailId,
            });

        let oldVote = reviewVote.amount;
        let newVote = oldVote == vote ? // Toggle
            Vote.NONE : vote;

        reviewVote.amount = newVote;
        review.upvotes += newVote - oldVote;

        reviewVote.save();
        review.save();

        return new Response(JSON.stringify({review, vote: newVote}));
    }

    async ok(_: Request) {
      return new Response();
    }
}

enum Vote {
    NONE = 0,
    UP = 1,
    DOWN = -1,
}

function voteFromString(s: string): Vote | undefined {
    switch (s) {
        case "up": return Vote.UP;
        case "down": return Vote.DOWN;
        case "none": return Vote.NONE;

        default: return undefined;
    }
}

