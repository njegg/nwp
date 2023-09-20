import { StatusCodes } from "http-status-codes";
import { RequestError } from "../../error";
import { verify, decode } from "jsonwebtoken";


export const TOKEN_KEY = Bun.env.TOKEN_KEY || "";

if (TOKEN_KEY == "") {
    console.error("TOKEN_KEY not set");
    process.exit(1);
}


export function authorize(req: Request): string | undefined {
    const token = getTokenFromRequest(req);

    if (!token) {
        throw new RequestError(
            "You need to login to do that",
            StatusCodes.UNAUTHORIZED
        );
    }

    verify(token, TOKEN_KEY); // Throws

    return getUsernameFromToken(token);
}

export function getTokenFromRequest(req: Request): string | undefined {
    let token = req.headers.get("authorization");

    return !token || !(token = token.split("Bearer ")[1]) ?
        undefined : token;
}

export function getUsernameFromRequest(req: Request): string | undefined {
  let token = getTokenFromRequest(req);
  return token ? getUsernameFromToken(token) : undefined;
}

export function getUsernameFromToken(token: string): string | undefined {
    if (!token) {
        return undefined;
    }
    
    let decoded: any = decode(token);

    return decoded ? decoded.username : undefined;
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