import { Chain } from '@civic/common-gateway-react';
import { PublicKey, Transaction } from '@safecoin/web3.js';
import { safecoinGatewayProps } from './types';
export declare const chainImplementation: ({ clusterUrl, cluster, publicKey, signTransaction, handleTransaction, gatekeeperNetworkAddress, stage, }: {
    clusterUrl: string;
    cluster: string;
    publicKey: PublicKey;
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
    handleTransaction?: ((transaction: Transaction) => Promise<void>) | undefined;
    gatekeeperNetworkAddress: PublicKey;
    stage: string;
}) => Chain;
export declare const usesafecoinGateway: () => safecoinGatewayProps;
