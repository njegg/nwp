import { StatusCodes } from "http-status-codes";
import { RequestError } from "../../error";
import { getBodyAsJson } from "../../request_util";
import { User } from "../../schema";
import { Controller } from "../controller";
import { mongooseToRequestError } from "../mongoose_error";
import { sign } from "jsonwebtoken";
import { TOKEN_KEY, getUsernameFromRequest } from "./auth";


export class AuthController extends Controller {
    constructor(mapping: string) {
        super(mapping);

        this.addPath("POST", "/register", this.register);
        this.addPath("POST", "/login", this.login);
        this.addPath("GET", "", this.getUsername);
    }

    async register(req: Request): Promise<Response> {
        let user = new User(await getBodyAsJson(req))

        user = await user.save()
            .catch(e => {throw mongooseToRequestError(e)});

        user.email = user.email.toLowerCase();
        user.username = user.username.toLowerCase();
        user.password = await Bun.password.hash(user.password);

        user = await user.save()
            .catch(e => {throw mongooseToRequestError(e)});

        return new Response();
    }

    async login(req: Request): Promise<Response> {
        let { username, password } = await getBodyAsJson(req) as { username: string, password: string }

        if (!username) throw new RequestError("Username not provided", StatusCodes.BAD_REQUEST);
        if (!password) throw new RequestError("Password not provided", StatusCodes.BAD_REQUEST);

        username = username.toLocaleLowerCase();

        let user = await User.findOne({ username }).exec();
        if (!user) throw new RequestError(`User ${username} does not exist`, StatusCodes.NOT_FOUND);

        const correctPassword = await Bun.password.verify(password, user.password);
        if (!correctPassword) throw new RequestError("Password does not match", StatusCodes.UNAUTHORIZED);

        const token = sign(
            { user_id: user._id, username, },
            TOKEN_KEY,
            { expiresIn: "1d"}
        );

        return new Response(JSON.stringify(token));
    }

    async getUsername(req: Request): Promise<Response> {
        return new Response(JSON.stringify(getUsernameFromRequest(req)));
    }
}

