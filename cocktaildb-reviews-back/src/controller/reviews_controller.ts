import mongoose from "mongoose";
import { RequestError } from "../error";
import { getBodyAsJson } from "../request_util";
import { Review } from "../schema";
import { Controller } from "./controller";
import { authorize } from "./auth/auth";


export class ReviewController extends Controller {
    constructor(mapping: string) {
        super(mapping);

        this.addPath("POST", "", this.postReview);
        this.addPath("GET", "/{id}", this.getCocktailReviews);
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

    async getCocktailReviews(_: Request, id: string) {
        if (!+id) {
            throw new RequestError(`Path variable id: '${id}' should be a number`, 400);
        }

        let reviews = await Review.find({ cocktailId: id }).exec();

        return new Response(JSON.stringify(reviews));
    }

}

