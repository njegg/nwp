export type Err = { ok: false, error: Error };

export default function Err(error: Error | string): Err {
    if (typeof error === 'string') {
        return { ok: false, error: new Error("Error: " + error)}
    }

    return { ok: false, error };
}
