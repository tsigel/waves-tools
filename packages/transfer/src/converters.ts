import { BigNumber } from '@waves/bignumber';
import { curry } from '@waves-tools/curry';

type MoveCaretFn = (byteCount: number) => void;

const toBytesLength = curry((length: number, bytes: Uint8Array) => bytes.length < length
    ? Uint8Array.from([
        ...new Array(length - bytes.length).fill(0),
        ...bytes
    ])
    : bytes);

const withStaticLength = curry((fn: (bytes: Uint8Array) => any, length: number) =>
    (bytes: Uint8Array, move: MoveCaretFn) => {
        move(length);
        return fn(bytes.slice(0, length));
    });

const intToBytesPrimitive = (length: number) =>
    (data: number) => toBytesLength(length, new BigNumber(data)
        .toBytes({ isLong: false }));

const intFromBytesPrimitive = withStaticLength(
    (bytes: Uint8Array) => BigNumber.fromBytes(bytes, { isLong: false })
        .toNumber());

const int = (name: string, length: number) => [name, intToBytesPrimitive(length), intFromBytesPrimitive(length)];

const type = int('type', 1);
const version = int('version', 1);
