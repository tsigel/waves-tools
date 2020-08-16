import { factory } from '../src';
import { getAPIToken } from '@waves-tools/oauth';

describe('Private request', () => {

    const SEED = '123 123 123';
    const wait = (time?: number) => new Promise(resolve => setTimeout(resolve, (time ?? 1) * 1000));

    const testFetch = (fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>) => {
        return fetch('https://api.waves.exchange/v1/deposit/addresses/BTC')
            .then(request => request.json())
            .then(data => {
                expect(data.type).toBe('deposit_addresses');
            });
    };

    it('Test private request by SEED', () => {
        const privateFetch = factory({
            seed: SEED,
        });

        return testFetch(privateFetch);
    });

    it('Test private request by token pair', () => {
        return getAPIToken({ seed: SEED })
            .then(({ refresh_token, access_token }) => {
                const privateFetch = factory({
                    access_token, refresh_token
                });

                return testFetch(privateFetch);
            });

    });

    it('Test by only refresh token', () => {
        return getAPIToken({ seed: SEED })
            .then(({ refresh_token }) => {
                const privateFetch = factory({
                    refresh_token
                });

                return testFetch(privateFetch);
            });
    });

    it('Test by expired access token', () => {
        return getAPIToken({ seed: SEED, expiration: Date.now() + 2500  })
            .then((data) => wait().then(() => data))
            .then(({ refresh_token, access_token }) => {

                const privateFetch = factory({
                    access_token,
                    refresh_token
                });

                return testFetch(privateFetch);
            });
    });

});
