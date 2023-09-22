import mongoose from "mongoose";

import { RequestError } from "./error";
import { ReviewController } from "./controller/reviews_controller";
import { AuthController } from "./controller/auth/auth_controller";
import { JsonWebTokenError } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { PingController } from "./controller/ping_controller";


mongoose.connect('mongodb://127.0.0.1:27017/nwp')
    .then(_ => console.log("Connected to DB"))
    .catch(err => {
        console.error("Failed to connect to DB:\n");
        console.error(err);
        process.exit(1);
    });

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

    error(err) {
        let responseBody: any;

        if (err instanceof JsonWebTokenError) {
            responseBody = {
                message: "Your session has expired",
                code: StatusCodes.UNAUTHORIZED
            };
        } else if (err instanceof RequestError) {
            responseBody = err;
        } else {
            responseBody = {
                message: "Internal server error :(",
                code: StatusCodes.INTERNAL_SERVER_ERROR,
            };

            console.error(err);
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
