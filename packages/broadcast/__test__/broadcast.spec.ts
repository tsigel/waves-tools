import { fetch, parseResponse } from '../src';

describe('Fetch', () => {
    it('Check is available', () => {
        expect(typeof fetch).toBe('function');
    });

    it('Fetch is working', () => {
        return fetch('https://nodes.wavesplatform.com/blocks/height')
            .then(response => response.json())
            .then(({ height }) => expect(typeof height).toBe('number'));
    });

    it('Check parser', () => {
        return fetch('https://nodes.wavesplatform.com/blocks/height')
            .then(parseResponse)
            .then(({ content }) => expect(typeof content.height).toBe('number'));
    });

    it('Check parse error response', () => {
        return fetch('https://nodes.wavesplatform.com/blocks')
            .then(parseResponse)
            .catch(({ content }) => {
                expect(typeof content).toBe('string');
            });
    });
});
