import { Result } from "./result";

export interface Matchers<T, R1, R2> {
    Ok(value: T): R1;
    Err(error: Error): R2;
}
  
export const match = <T, R1, R2>(
    result: Result<T>,
    matchers: Matchers<T, R1, R2>,
) => result.ok === true ?
    matchers.Ok(result.value) :
    matchers.Err(result.error);
  