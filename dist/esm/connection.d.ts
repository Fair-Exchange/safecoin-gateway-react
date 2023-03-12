import { ReactNode, JSX } from 'react';
import { Connection } from '@safecoin/web3.js';
export declare const getsafecoinConnection: (clusterUrl: string) => Connection;
export declare function safecoinConnectionProvider({ children, endpoint, }: {
    children: ReactNode;
    endpoint: string;
}): JSX.Element;
export declare function useConnection(): Connection;
