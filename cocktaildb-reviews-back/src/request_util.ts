import { RequestError } from "./error";

const decoder = new TextDecoder();

export async function getBodyAsJson<T>(req: Request): Promise<T> {
    let body = await req.body?.getReader().read()
        .then(data => decoder.decode(data.value))
        .catch(_ => { throw new RequestError("Error while reading request body", 400) });

    if (!body) {
        throw new RequestError("No request body", 400);
    }

    try {
        return <T> JSON.parse(body);
    } catch (parseError: any) {
        throw new RequestError(`${parseError.message}`, 400)
    }
}
