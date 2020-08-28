import {
    buildAddressByPublicKey,
    buildAddressBySeed,
    buildKeyPair,
    decryptByPassword,
    encryptByPassword, messageDecrypt, messageEncrypt,
    signBytes,
    validateSignature
} from '../src';

describe('Crypto', () => {
    const seed = 'Some seed phrase!';
    const keyPair = buildKeyPair(seed);
    const sign = signBytes(keyPair.privateKey);
    const verify = validateSignature(keyPair.publicKey);
    const referenceAddress = '3PCEQRDCcUY4Jy8inXiAj4kebCpgKcjqd8x';
    const buildBySeed = buildAddressBySeed('W');
    const buildByPublicKey = buildAddressByPublicKey('W');


    it('Check key pair', () => {
        expect(keyPair).toEqual({
            'privateKey': 'DRPPEgnKoqdTyciFuGrFUgCjc7pSpTASgSQsNFotV7rA',
            'publicKey': '4SuUXBNVYx7mRn3BRKRQss6D1GoEFdBJZK7L57twNfy4'
        });
    });

    it('Check address by public key', () => {
        expect(buildByPublicKey(keyPair.publicKey))
            .toBe(referenceAddress);
    });

    it('Check address by seed phrase', () => {
        expect(buildBySeed(seed))
            .toBe(referenceAddress);
    });

    it('Sign bytes and verify signature', () => {
        const bytes = Uint8Array.from([1, 2, 3, 128, 8]);

        expect(verify(sign(bytes), bytes)).toBe(true);
    });

    it('Encrypt/decrypt by password', () => {
        const message = 'Test message for encrypt';
        const encrypted = encryptByPassword(5000, 'password', message);

        expect(decryptByPassword(5000, 'password', encrypted))
            .toBe(message);
    });

    it('Encrypt/decrypt message', () => {
        const seedForDecrypt = 'Some seed phrase for decrypt message';
        const decryptKeyPair = buildKeyPair(seedForDecrypt);
        const prefix = 'prefix';
        const encrypt = messageEncrypt(keyPair.privateKey, decryptKeyPair.publicKey, prefix);
        const decrypt = messageDecrypt(decryptKeyPair.privateKey, keyPair.publicKey, prefix);
        const message = 'Some message for encrypt';

        expect(decrypt(encrypt(message))).toBe(message);
    });

});
