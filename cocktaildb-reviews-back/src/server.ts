import mongoose from "mongoose";

import { RequestError } from "./error";
import { ReviewController } from "./controller/reviews_controller";
import { AuthController } from "./controller/auth/auth_controller";
import { JsonWebTokenError } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

mongoose.connect('mongodb://127.0.0.1:27017/nwp');

const reviewController = new ReviewController("/reviews");
const authController = new AuthController("/auth");

Bun.serve({
    port: 8080,
    hostname: "localhost",

    async fetch(req) {
        console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`)

        let path = new URL(req.url).pathname;

        if (path.startsWith(reviewController.mapping)) {
            path = path.substring(reviewController.mapping.length);
            return reviewController.map(path, req);
        }

        if (path.startsWith(authController.mapping)) {
            path = path.substring(authController.mapping.length);
            return authController.map(path, req);
        }

        if (path === "/die") throw new Error("rip"); // error test

        throw new RequestError(`No mapping for ${path}`, 400);
    },

    error(error) {
        let responseBody: any;

        if (error instanceof JsonWebTokenError) {
            responseBody = {
                message: "Bad Token",
                code: StatusCodes.UNAUTHORIZED
            };
        } else if (error instanceof RequestError) {
            responseBody = error;
        } else {
            responseBody = {
                message: "Internal server error :(",
                code: 500,
            };

            console.error(error);
        }

        return new Response(JSON.stringify(responseBody), {
            headers: { "Content-Type": "application/json" },
            status: +(responseBody.code || 500),
        });
    },

})

console.log("Server is runnin'");

