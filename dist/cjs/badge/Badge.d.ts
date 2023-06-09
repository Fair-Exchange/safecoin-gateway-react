import { PublicKey, Connection } from '@safecoin/web3.js';
import React from 'react';
export declare type BadgeProps = {
    gatekeeperNetwork: PublicKey;
    publicKey: PublicKey;
    clusterUrl?: string;
    connection?: Connection;
};
declare const Badge: React.FC<BadgeProps>;
export default Badge;
