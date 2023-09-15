import { StatusCodes } from "http-status-codes";
import { RequestError } from "../../error";
import { verify, decode } from "jsonwebtoken";


export const TOKEN_KEY = Bun.env.TOKEN_KEY || "";

if (TOKEN_KEY == "") {
    console.error("TOKEN_KEY not set");
    process.exit(1);
}


export function Authorize(
    _target: Object,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
): any {
    const original = descriptor.value;

    descriptor.value = async function(...args: any[]) {
        authorize(args[0] as Request);

        return original.apply(this, args);
    };

    return descriptor;
}

export function authorize(req: Request): string {
    let token = req.headers.get("authorization");

    if (!token || !(token = token.split("Bearer ")[1])) {
        throw new RequestError(
            "You need to login to do that",
            StatusCodes.UNAUTHORIZED
        );
    }

    verify(token, TOKEN_KEY); // Throws

    return (decode(token) as any).username;
}

