import { BigNumber } from '@waves/bignumber';

const schema = [
    type,
    version,
    publicKey,
    wavesOrAsset('assetId'),
    wavesOrAsset('feeAssetId'),
    long('timestamp'),
    long('amount'),
    attachment('attachment')
];

const int = (name: string, length: number) => ({
    encode: (data: Record<string, any>) =>
        new BigNumber(data[name])
            .toBytes({ isLong: false }),
    decode: (caret: number, bytes: Uint8Array, move: (count: number) => void) => {
        move(length);
        return {
            [name]: BigNumber.fromBytes(bytes.slice(caret, length), { isLong: false })
                .toNumber()
        };
    }
});

const base58 = (name: string, length: number) => ({
    encode: (data) => base58Decode(data[name]),
    decode: (caret, bytes, move) => {
        move(length);
        return { [name]: base58Encode(bytes.slice(caret, length)) };
    }
});

const type = () => int('type', 1);
const version = () => int('version', 1);
const senderPublicKey = () => base58('senderPublicKey', 32);
const currencyId = (name: string) => ({
    encode: (data) => data[name] == null ? [0, 0],
    decode: (caret, bytes, move) => {
        const isWaves = bytes[caret];
        move(1);
        if (isWaves) {
            return { [name]: null };
        } else {
            return base58(name, 32).decode(caret + 1, bytes, move);
        }
    }
});

type MoveCaretFn = (byteCount: number) => void;

type SchemaItem<T> = [
    string,
    (data: T) => number[],
    (bytes: Uint8Array, move: MoveCaretFn) => T
]

const bytes = [
    4, // type
    2, // version
    // ----
    144,  //  public key
    218,
    166,
    241,
    162,
    23,
    35,
    247,
    80,
    61,
    225,
    27,
    29,
    182,
    54,
    216,
    132,
    37,
    59,
    185,
    168,
    205,
    26,
    217,
    88,
    216,
    209,
    109,
    198,
    8,
    179,
    6,
    // ---
    0, 0,  // assetId
    // ---
    0, 0, // feeAssetId
    // --
    0, 0, 0, 0, 0, 0, 0, 0, // timestamp
    0, 0, 0, 0, 0, 0, 0, 0, // amount
];
