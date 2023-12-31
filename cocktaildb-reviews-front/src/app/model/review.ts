
export interface Review {
    _id: string,
    cocktailId: number,
    reviewerName: string,
    content: string,
    rating: number,
    upvotes: number,
}

export interface PostReviewResponse {
    review: Review,
    update: boolean,
}

export interface ReviewAndVote {
    review: Review,
    vote: Vote,
}

export enum Vote {
    UP = 1,
    DOWN = -1,
    NONE = 0,
}

export namespace Vote {
    export function toString(vote: Vote): string {
        switch (vote) {
            case Vote.DOWN: return "down";
            case Vote.UP: return "up";
            case Vote.NONE: return "none";
        }
    }
}

export type PopularReviewsResponse = { cocktailId: number }[];
