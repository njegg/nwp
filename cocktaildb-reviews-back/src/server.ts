import mongoose from "mongoose";

import { RequestError } from "./error";
import { ReviewController } from "./controller/reviews_controller";
import { AuthController } from "./controller/auth/auth_controller";
import { JsonWebTokenError } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { PingController } from "./controller/ping_controller";


mongoose.connect('mongodb://127.0.0.1:27017/nwp');

const controllers = [
    new ReviewController("/reviews"),
    new AuthController("/auth"),
    new PingController("/ping"),
]

Bun.serve({
    port: 8080,
    hostname: "localhost",

    async fetch(req) {
        console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`)

        if (req.method == "OPTIONS") {
            let res = new Response();
            res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.headers.set('Access-Control-Allow-Origin', '*');
            res.headers.set('Access-Control-Allow-Headers', '*');
            return res;
        }

        let res: Response | undefined = undefined;
        let path = new URL(req.url).pathname;

        for (let controller of controllers) {
            if (path.startsWith(controller.mapping)) {
                path = path.substring(controller.mapping.length);
                res = await controller.map(path, req);
            }
        }

        if (res) {
            res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.headers.set('Access-Control-Allow-Origin', '*');
            return res;
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
        } else if (error instanceof mongoose.Error.CastError){
            responseBody = {
                message: "Cast error, check parameters",
                code: StatusCodes.BAD_REQUEST,
            };
        } else {
            responseBody = {
                message: "Internal server error :(",
                code: StatusCodes.INTERNAL_SERVER_ERROR,
            };

            console.error(error);
        }

        let res = new Response(JSON.stringify(responseBody), {
            headers: { "Content-Type": "application/json" },
            status: +(responseBody.code || 500),
        });

        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.headers.set('Access-Control-Allow-Origin', '*');

        return res;
    },
})


console.log("Server is runnin'");

