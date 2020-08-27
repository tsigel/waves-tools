import { curry } from '../src';

describe('Curry', () => {
    const sumFunc = (a: number, b: number, c: number) => a + b + c;
    const curred = curry(sumFunc);

    it('Simple call', () => {
        expect(curred(1, 2, 3)).toBe(sumFunc(1, 2, 3));
    });

    it('Chain call', () => {
        expect(curred(1)(2)(3)).toBe(sumFunc(1, 2, 3));
    });

    it('Add last arg', () => {
        const fn = curred(1, 2);
        expect(fn(1)).toBe(4);
        expect(fn(2)).toBe(5);
    });

    it('Check types', () => {
        const fn = curry(
            (name: string, age: number, isMale: boolean) => `Name is ${name}, age: ${age}, male: ${isMale}`
        );

        expect(fn('Jon')(17)(true)).toBe(fn('Jon', 17, true));
    });

    describe('Check curry n', () => {
        const fn = (...args: Array<number>): number => args.reduce((a, b) => a + b, 0);
        const curred = curry(fn, 3);

        it('Simple call curry n', () => {
            expect(curred(1, 2, 3)).toBe(sumFunc(1, 2, 3));
        });

        it('Chain call curry n', () => {
            expect(curred(1)(2)(3)).toBe(sumFunc(1, 2, 3));
        });

        it('Add last arg to curry n', () => {
            const fn = curred(1, 2);
            expect(fn(1)).toBe(4);
            expect(fn(2)).toBe(5);
        });
    });
});
