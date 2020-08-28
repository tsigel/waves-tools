import { AssetOrWaves, Base58String, Long, TransactionNameMap } from './constants';


export type BaseTransactionFields<LONG = Long> = {
    timestamp: number;
    senderPublicKey: string;
    version: number;
    fee: LONG;
};

export type Transfer<LONG = Long> = {
    type: TransactionNameMap['TRANSFER'];
    assetId: AssetOrWaves;
    amount: LONG;
    feeAssetId: AssetOrWaves;
    attachment: Base58String;
} & BaseTransactionFields<LONG>;
