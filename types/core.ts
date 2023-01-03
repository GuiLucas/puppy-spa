export type Either<T, U> = T | U

export type Optional<T> = Either<T, undefined>

export type OptionalNull = Either<null, undefined>

export type Nullable<T> = Either<T, OptionalNull>
