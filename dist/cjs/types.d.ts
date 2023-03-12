import { Connection, PublicKey, Transaction } from '@safecoin/web3.js';
import { State, GatewayProps, Options } from '@civic/common-gateway-react';
import React from 'react';
export interface ConnectionContextValues {
    endpoint: string;
    connection: Connection;
}
export interface safecoinWalletAdapter {
    publicKey?: PublicKey;
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
}
/**
 * The properties object passed by the dApp when defining the component
 */
export declare type safecoinGatewayProviderProps = {
    wallet?: safecoinWalletAdapter;
    gatekeeperNetwork?: PublicKey;
    stage?: string;
    clusterUrl: string;
    cluster?: string;
    wrapper?: React.FC;
    logo?: string;
    redirectUrl?: string;
    broadcastTransaction?: boolean;
    handleTransaction?: (transaction: Transaction) => Promise<void>;
    options?: Options;
    children?: React.ReactNode;
};
export declare type safecoinGatewayToken = {
    readonly issuingGatekeeper: PublicKey;
    readonly gatekeeperNetworkAddress: PublicKey;
    readonly owner: PublicKey;
    readonly state: State;
    readonly publicKey: PublicKey;
    readonly expiryTime?: number;
};
export declare type safecoinGatewayProps = Omit<GatewayProps, 'gatewayToken' | 'gatewayTokenTransaction'> & {
    gatewayToken?: safecoinGatewayToken;
    gatewayTokenTransaction?: Transaction;
};
export * from '@civic/common-gateway-react';
