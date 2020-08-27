import { fetch, parseResponse } from '@waves-tools/fetch';
import { TTransaction } from '@waves/waves-transactions/dist/make-tx';
import { TRANSACTION_TYPE } from '@waves/waves-transactions/dist/transactions';


export const broadcast: IBroadcast = (<T extends TTransaction<TransactionTypeUnion>>(node: string, tx?: T) => {
    const url = new URL('/transactions/broadcast', node);

    const apply = (tx: T): Promise<T> => fetch(url.toString(), {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(tx)
    })
        .then(parseResponse)
        .then((response) => response.content);

    return tx ? apply(tx) : apply;
}) as IBroadcast;

type TransactionTypeUnion = typeof TRANSACTION_TYPE[keyof typeof TRANSACTION_TYPE];

interface IBroadcast {
    <T extends TTransaction<TransactionTypeUnion>>(node: string, tx: T): Promise<T>;
    <T extends TTransaction<TransactionTypeUnion>>(node: string): (tx: T) => Promise<T>;
}

export default broadcast;
