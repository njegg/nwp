import { RequestError } from "../error";

export type Endpoint = (req: Request, ...pathVars: string[]) => Promise<Response>;

export abstract class Controller {
    endpointPaths: [regex: RegExp, endpoint: Endpoint, hasPathVars: boolean][];
    decoder = new TextDecoder();
    mapping: string;

    constructor(mapping: string) {
        this.endpointPaths = new Array();
        this.mapping = mapping;
    }

    addPath(method: string, path: string, endpoint: Endpoint) {
        let req = this.formatRequest(method, path);

        if (req.indexOf("{")) {
            let reg = new RegExp(`^${req.replaceAll(/{(.*?)}/g, "(?<$1>[^/]*?)")}$`, "g");
            this.endpointPaths.push([reg, endpoint, true])
        } else {
            let reg = new RegExp(`^${req}/?$`, "g");
            this.endpointPaths.push([reg, endpoint, false])
        }

        console.log(`registered a path: ${req}`);
    }

    map(path: string, req: Request): Promise<Response> {
        let method = req.method;

        let requestString = this.formatRequest(method, path);
        let endpointPath = this.endpointPaths.find(x => requestString.match(x[0]));

        if (!endpointPath) {
            throw new RequestError(`No controller mapping for '${method} ${path}'`, 400);
        }

        let [reg, endpoint, hasVars] = endpointPath;
        let vars: string[] = [];

        if (hasVars) {
            let groups = [...requestString.matchAll(reg)][0].groups;
            vars = Object.values(groups || {});
        }

        return endpoint(req, ...vars);
    }

    formatRequest = (method: string, path: string) => `${method} ${path}`;
}

