export class RequestError extends Error {
    constructor(public message: string, public code: number) {
        super(message);
    }
}
