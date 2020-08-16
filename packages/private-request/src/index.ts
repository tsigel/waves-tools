import { getAPIToken, refreshApiToken } from '@waves-tools/oauth';
import fetch from '@waves-tools/fetch';
import applySpec from 'ramda/src/applySpec';
import prop from 'ramda/src/prop';


export type GetPrivateRequestSeedOptions = {
    seed: string;
    chainCode?: string;
}

export type GetPrivateRequestTokenOptions = {
    access_token?: string
    refresh_token: string;
};

export type GetPrivateRequestOptions =
    { apiBase?: string; }
    & (GetPrivateRequestSeedOptions | GetPrivateRequestTokenOptions) ;

type TokenPair = {
    accessToken: string;
    refreshToken: string;
};

const tokenResponseToPair = applySpec<TokenPair>({
    accessToken: prop('access_token'),
    refreshToken: prop('refresh_token')
});

const isTokenOptions = (options: GetPrivateRequestOptions): options is GetPrivateRequestTokenOptions => {
    return 'refresh_token' in options && typeof options['refresh_token'] === 'string' && Boolean(options.refresh_token);
};

const getTokenPair = (options: GetPrivateRequestOptions): Promise<TokenPair> => {
    if (isTokenOptions(options)) {
        if (options.access_token) {
            return Promise.resolve({ refreshToken: options.refresh_token, accessToken: options.access_token });
        } else {
            return refreshApiToken({ refreshToken: options.refresh_token })
                .then(tokenResponseToPair);
        }
    } else {
        return getAPIToken(options)
            .then(tokenResponseToPair);
    }
};

export const factory = (options: GetPrivateRequestOptions) => {
    const pairPromise = getTokenPair(options);
    const storage: Partial<TokenPair> = Object.create(null);

    pairPromise.then(pair => {
        Object.assign(storage, pair);
    });

    return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
        const request = (token: string) => {
            if (typeof input !== 'string') {
                input.headers.set('Authorization', `Bearer ${token}`);

                return fetch(input);
            } else {
                const requestInit: RequestInit = init || Object.create(null);
                requestInit.headers = {
                    ...requestInit.headers,
                    'Authorization': `Bearer ${token}`
                };

                return fetch(input, requestInit);
            }
        };

        const retry = (response: Response): Response | Promise<Response> =>
            response.status === 401
                ? pairPromise
                    .then(pair => refreshApiToken(pair))
                    .then(tokenResponseToPair)
                    .then(pair => {
                        Object.assign(storage, pair);

                        return run();
                    })
                : response;

        const run = () => {
            if (storage.accessToken) {
                return request(storage.accessToken);
            } else {
                return pairPromise.then((pair) => request(pair.accessToken));
            }
        };

        return run()
            .then(retry);
    };
};

export default factory;
