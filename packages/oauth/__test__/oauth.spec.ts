import { getAPIToken, refreshApiToken } from '../src';

const SEED = 'SOME SEED PHRASE';

describe('Oauth', () => {

    it('Get token', () => {
        return getAPIToken({ seed: SEED, })
            .then(response => {
                expect(typeof response.access_token).toBe('string');
            });
    });

    it('Refresh token', () => {
        return getAPIToken({ seed: SEED })
            .then(data => refreshApiToken({ refreshToken: data.refresh_token }))
            .then(response => {
                expect(typeof response.access_token).toBe('string');
            });
    });

    it('Get expired token', () => {
        return getAPIToken(({ seed: SEED, expiration: Date.now() }))
            .catch((data) => {
                expect(data.response.ok).toBe(false);
                expect(typeof data.content).toBe('object');
            });
    });
});
