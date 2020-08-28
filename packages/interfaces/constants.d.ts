export type TRANSACTION_NAME_MAP = {
    GENESIS: 1;
    SEND: 2;
    ISSUE: 3;
    TRANSFER: 4;
    REISSUE: 5;
    BURN: 6;
    EXCHANGE: 7;
    LEASE: 8;
    CANCEL_LEASING: 9;
    CREATE_ALIAS: 10;
    MASS_TRANSFER: 11;
    DATA: 12;
    SET_SCRIPT: 13;
    SPONSORSHIP: 14;
    SET_ASSET_SCRIPT: 15;
    UPDATE_ASSET_INFO: 16;
}

export type TRANSACTION_TYPE = TRANSACTION_NAME_MAP[keyof TRANSACTION_NAME_MAP];

export type DATA_ENTRY_TYPE_NAME_MAP = {
    INTEGER: 0;
    BOOLEAN: 1;
    BINARY: 2;
    STRING: 3;
}

export type DATA_ENTRY_TYPE = DATA_ENTRY_TYPE_NAME_MAP[keyof DATA_ENTRY_TYPE_NAME_MAP];

export type Long = string | number;

export type AssetOrWaves = string | null;
export type Base58String = string;

export type NETWORK_NAME_MAP = {
    mainnet: 'W',
    testnet: 'T',
    stagenet: 'S',
    devnet: 'D'
};
