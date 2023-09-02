import { Err } from "./err";
import { Ok } from "./ok";

export type Result<T> = Ok<T> | Err
