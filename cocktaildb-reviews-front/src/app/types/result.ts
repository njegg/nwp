import { Err } from "./err";
import { Ok } from "./ok";

export type Result<T, E = Error> = Ok<T> | Err
