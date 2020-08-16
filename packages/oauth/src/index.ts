import { libs } from '@waves/waves-transactions';
import { fetch, parseResponse } from '@waves-tools/fetch';


export type GetAPITokenOptions = TokenData & {
    seed: string;
    expiration?: number;
}

export type RefreshTokenOptions = TokenData & {
    refreshToken: string;
}

export type TokenResponse = {
    access_token: string;
    token_type: 'bearer';
    expires_in: number;
    refresh_token: string;
}

type TokenData = {
    scope?: 'general';
    apiBase?: string;
    chainCode?: string;
    clientId?: string
}

const CLIENT_ID = 'waves.exchange';

const createRequest = (data: TokenData, body: Array<string>): Promise<TokenResponse> => {
    return fetch(`${data.apiBase ?? 'https://api.waves.exchange'}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: [
            ...body,
            'grant_type=password',
            `scope=${data.scope ?? 'general'}`,
            `client_id=${data.clientId ?? CLIENT_ID}`
        ].join('&')
    }).then(parseResponse).then(({ content }) => content);
};

export const getAPIToken = (data: GetAPITokenOptions): Promise<TokenResponse> => {
    const seconds = Math.round((data.expiration ?? (Date.now() + 1000 * 60 * 60 * 24 * 7)) / 1000);
    const bytes = [
        255, 255, 255, 1,
        ...Array.from(libs.crypto.stringToBytes(`${data.chainCode ?? 'W'}:${CLIENT_ID}:${seconds}`))
    ];
    const signature = libs.crypto.signBytes(data.seed, bytes);
    const body = [
        `username=${encodeURIComponent(libs.crypto.publicKey(data.seed))}`,
        `password=${encodeURIComponent(`${seconds}:${signature}`)}`
    ];

    return createRequest(data, body);
};

export const refreshApiToken = (data: RefreshTokenOptions): Promise<TokenResponse> => {
    const body = [
        'grant_type=refresh_token',
        `refresh_token=${data.refreshToken}`
    ];
    return createRequest(data, body);
};

export default getAPIToken;
