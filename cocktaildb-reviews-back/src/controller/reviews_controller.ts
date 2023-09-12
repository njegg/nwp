import { RequestError } from "../error";
import { getBodyAsJson } from "../request_util";
import { Review } from "../schema";
import { Controller } from "./controller";

export class ReviewControlle extends Controller {
    constructor(mapping: string) {
        super(mapping);

        this.addPath("GET", "", this.getTest);
        this.addPath("GET", "/{id}", this.getReviewTest);
        this.addPath("GET", "/epik/{id}/space/{name}/space", this.getVarTest);
        this.addPath("POST", "", this.postReview);
    }

    async postReview(req: Request): Promise<Response> {
        let review: Review = await getBodyAsJson<Review>(req);

        return new Response(`id: ${review.cocktailId}`);
    }

    async getTest(_: Request) {
        return new Response("heloo0!!");
    }

    async getReviewTest(_: Request, idStr: string): Promise<Response> {
        let id: number = +idStr; 

        if (!id) throw new RequestError(`'id: ${idStr}' is not a number'`, 400);

        return new Response(`id: ${id}`);
    }

    async getVarTest(_: Request, id: string, name: string) {
        return new Response(`id: ${id}, name: ${name}`);
    }
}
