export type Ok<T> = { ok: true, value: T };

export default function Ok<T>(value: T): Ok<T> {
    return { ok: true, value };
}