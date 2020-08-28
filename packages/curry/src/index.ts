export const curry: ICurry = (callback: AnyFunction, n?: number) => {
    const loop = (...args: Array<any>): any => {
        if (args.length >= (n ?? callback.length)) {
            return callback(...args);
        } else {
            return (...local: Array<any>) => loop(...[...args, ...local]);
        }
    };

    return loop;
};

export type AnyFunction = (...args: Array<any>) => any;
export type TypedFunction<ARGS extends Array<any>, RETURN> = (...args: ARGS) => RETURN;

export interface ICurred2<A, B, R> {
    (a: A, b: B): R;

    (a: A): TypedFunction<[B], R>;
}

export interface ICurred3<A, B, C, R> {
    (a: A, b: B, c: C): R;

    (a: A, b: B): TypedFunction<[C], R>;

    (a: A): ICurred2<B, C, R>;
}

export interface ICurred4<A, B, C, D, R> {
    (a: A, b: B, c: C, d: D): R;

    (a: A, b: B, c: C): TypedFunction<[D], R>;

    (a: A, b: B): ICurred2<C, D, R>;

    (a: A): ICurred3<B, C, D, R>;
}

export interface ICurred5<A, B, C, D, E, R> {
    (a: A, b: B, c: C, d: D, e: E): R;

    (a: A, b: B, c: C, d: D): TypedFunction<[E], R>;

    (a: A, b: B, c: C): ICurred2<D, E, R>;

    (a: A, b: B): ICurred3<C, D, E, R>;

    (a: A): ICurred4<B, C, D, E, R>;
}

export interface ICurry {
    <T, R>(fn: TypedFunction<[T], R>): TypedFunction<[T], R>;

    <A, B, R>(fn: TypedFunction<[A, B], R>): ICurred2<A, B, R>;

    <A, B, C, R>(fn: TypedFunction<[A, B, C], R>): ICurred3<A, B, C, R>;

    <A, B, C, D, R>(fn: TypedFunction<[A, B, C, D], R>): ICurred4<A, B, C, D, R>;

    <A, B, C, D, E, R>(fn: TypedFunction<[A, B, C, D, E], R>): ICurred5<A, B, C, D, E, R>;

    <T extends Array<any>, R>(fn: TypedFunction<T, R>, n: (0 | 1)): TypedFunction<T, R>;

    <T extends Array<any>, R>(fn: TypedFunction<T, R>, n: 2): ICurred2<T[keyof T], T[keyof T], R>;

    <T extends Array<any>, R>(fn: TypedFunction<T, R>, n: 3): ICurred3<T[keyof T], T[keyof T], T[keyof T], R>;
}

export default curry;
