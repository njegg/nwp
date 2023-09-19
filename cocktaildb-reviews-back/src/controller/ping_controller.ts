import { Controller } from "./controller";

export class PingController extends Controller {
    constructor(mapping: string) {
        super(mapping);

        this.addPath("GET", "", this.ping);
    }

    async ping() {
        return new Response();
    }
}