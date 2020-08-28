import { DATA_ENTRY_TYPE_NAME_MAP, NETWORK_NAME_MAP, TRANSACTION_NAME_MAP } from '@waves-tools/interfaces';


export const TransactionNameMap: TRANSACTION_NAME_MAP = {
    GENESIS: 1,
    SEND: 2,
    ISSUE: 3,
    TRANSFER: 4,
    REISSUE: 5,
    BURN: 6,
    EXCHANGE: 7,
    LEASE: 8,
    CANCEL_LEASING: 9,
    CREATE_ALIAS: 10,
    MASS_TRANSFER: 11,
    DATA: 12,
    SET_SCRIPT: 13,
    SPONSORSHIP: 14,
    SET_ASSET_SCRIPT: 15,
    UPDATE_ASSET_INFO: 16
}


export const DataEntryTypeNameMap: DATA_ENTRY_TYPE_NAME_MAP = {
    INTEGER: 0,
    BOOLEAN: 1,
    BINARY: 2,
    STRING: 3,
}

export const WAVES_ID = 'WAVES';
export const MAX_ADDRESS_LENGTH = 45;
export const MIN_ALIAS_LENGTH = 4;
export const MAX_ALIAS_LENGTH = 30;

export const Networks: NETWORK_NAME_MAP = {
    mainnet: 'W',
    testnet: 'T',
    stagenet: 'S',
    devnet: 'D'
};

export const TRANSFER_ATTACHMENT_BYTE_LIMIT: number = 140;
