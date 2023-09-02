export type Some<T> = { isSome: true, isNone: false, value: T }

export default function Some<T>(value: T) {
    return { isSome: true, isNone: false, value } 
}