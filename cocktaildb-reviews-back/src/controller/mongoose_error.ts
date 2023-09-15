import mongoose from "mongoose";
import { RequestError } from "../error";

const duplicateErrorCode = 11000;


export function mongooseToRequestError(e: any) {
    if (e instanceof mongoose.Error.ValidationError) {
        let message = Object.values(e.errors).map(e => e.message || "").join(" ");

        return new RequestError(message, 400)
    } else if (e.code ==  duplicateErrorCode) {
        let duplicateKey = Object.keys(e.keyPattern)[0];

        return new RequestError(`${duplicateKey} already exists`, 409);
    }

    console.error(`Unknown error: ${e}`);

    return new RequestError("Something went wrong", 500);
}
