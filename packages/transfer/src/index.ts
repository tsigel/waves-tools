import { Transfer } from '../../interfaces/transactions';
import { curry } from '@waves-tools/curry';

export const transfer = curry((env, data: TransferData, seed: string): Transfer => {
    return {
        type: data.type ?? 4,
        assetId: data.assetId,
        amount: data.amount,
        attachment: data.attachment ?? '',
        feeAssetId: data.feeAssetId ?? null,
        timestamp: data.timestamp ?? Date.now(),
        version: data.version ?? 2,
        senderPublicKey: data.senderPublicKey,
        fee: data.fee,
    };
});

export type TransferData =
    Partial<Transfer>
    & Pick<Transfer, 'amount' | 'assetId'>;

export type Env = {
    CHAIN_CODE: string;
};

