import fetch from '../src'

describe('Fetch', () => {
    it('Check is working', () => {
         expect(typeof fetch).toBe('function');
    });
});
