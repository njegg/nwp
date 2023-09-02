export type Some<T> = { some: true, value: T }

export default function Some<T>(value: T): Some<T> {
    return { some: true, value } 
}
