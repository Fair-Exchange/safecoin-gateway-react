import { safecoinWalletAdapter } from './types';
export { GatewayStatus } from '@civic/common-gateway-react';
export { IdentityButton, getTokenDescription, ButtonMode } from '@civic/common-gateway-react';
export { default as Badge } from './badge';
export { usesafecoinGateway as useGateway } from './chainImplementation';
export { safecoinGatewayProvider as GatewayProvider } from './safecoinGatewayProvider';
export declare type WalletAdapter = safecoinWalletAdapter;
export type { safecoinGatewayProps as GatewayProps, safecoinGatewayProviderProps as GatewayProviderProps, Options, } from './types';
