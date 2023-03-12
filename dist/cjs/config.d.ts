import { Config } from '@j0nnyboi/prove-safecoin-wallet';
export declare const GATEKEEPER_ENDPOINTS: Record<string, string>;
export declare const getGatekeeperEndpoint: (stage: string) => string;
export declare const makeConfig: (clusterUrl: string, cluster: string) => Config;
