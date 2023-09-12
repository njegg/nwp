import { ReviewControlle } from "./controller/reviews_controller";
import { RequestError } from "./error";

Bun.serve({
    port: 8080,
    hostname: "localhost",

    async fetch(req) {
        console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`)

        return mapRequest(req);
    },

    error(error) {
        let responseBody = error instanceof RequestError ?
            error : { message: "Internal server error :(", code: 500 };

        return new Response(JSON.stringify(responseBody), {
            headers: { "Content-Type": "application/json" },
            status: +responseBody.code,
        });
    },
})

const reviewController = new ReviewControlle("/reviews");

async function mapRequest(req: Request): Promise<Response> {
    let path = new URL(req.url).pathname;

    if (path.startsWith(reviewController.mapping)) {
        path = path.substring(reviewController.mapping.length);
        return reviewController.map(path, req);
    }

    if (path === "/die") throw new Error("rip"); // error test

    throw new RequestError(`No mapping for ${path}`, 400);
}


console.log("Server is runnin'");

