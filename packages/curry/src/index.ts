import { MAX_ALIAS_LENGTH } from '../../constants';
import curry from 'ramda/src/curry';

export const recipient = curry((env: Env, recipient: string): string =>
    recipient.length > MAX_ALIAS_LENGTH
        ? recipient
        : `alias:${env.CHAIN_CODE}:${recipient}`
);

export type Env = {
    CHAIN_CODE: string;
};

