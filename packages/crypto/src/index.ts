import { libs } from '@waves/waves-transactions';
import { curry } from '@waves-tools/curry';


export const signBytes = curry((privateKey: string, bytes: Uint8Array): string =>
    libs.crypto.signBytes({ privateKey }, bytes));

export const validateSignature = curry((publicKey: string, signature: string, bytes: Uint8Array) =>
    libs.crypto.verifySignature(publicKey, bytes, signature));

export const messageEncrypt = curry((privateKeyFrom: string, publicKeyTo: string, prefix: string, message: string) =>
    libs.crypto.base64Encode(
        libs.crypto.messageEncrypt(
            libs.crypto.sharedKey(privateKeyFrom, publicKeyTo, prefix),
            message
        )
    ));

export const messageDecrypt = curry((privateKeyTo: string, publicKeyFrom: string, prefix: string, message: string) =>
    libs.crypto.messageDecrypt(
        libs.crypto.sharedKey(
            privateKeyTo,
            publicKeyFrom,
            prefix
        ),
        libs.crypto.base64Decode(message)
    ));

export const encryptByPassword = curry((rounds: number, password: string, message: string) =>
    libs.crypto.encryptSeed(message, password, rounds));

export const decryptByPassword = curry((rounds: number, password: string, message: string) =>
    libs.crypto.decryptSeed(message, password, rounds));

export const buildKeyPair = (seed: string) => libs.crypto.keyPair(seed);

export const buildAddressBySeed = curry((chainId: string, seed: string) =>
    libs.crypto.address(seed, chainId));

export const buildAddressByPublicKey = curry((chainId: string, publicKey: string) =>
    libs.crypto.address({ publicKey }, chainId));

// TODO Переписать всё!
