"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usesafecoinGateway = exports.chainImplementation = void 0;
const safecoin_gateway_ts_1 = require("@j0nnyboi/safecoin-gateway-ts");
const common_gateway_react_1 = require("@civic/common-gateway-react");
const web3_js_1 = require("@safecoin/web3.js");
const prove_safecoin_wallet_1 = require("@j0nnyboi/prove-safecoin-wallet");
const config_1 = require("./config");
const version_1 = require("./version");
const createsafecoinTransactionFromBase64 = (partiallySignedTx) => web3_js_1.Transaction.from(Buffer.from(partiallySignedTx, 'base64'));
const chainImplementation = ({ clusterUrl, cluster, publicKey, signTransaction, handleTransaction, gatekeeperNetworkAddress, stage, }) => {
    common_gateway_react_1.logger.debug('Connecting to cluster with commitment recent', clusterUrl);
    const connection = new web3_js_1.Connection(clusterUrl, 'processed');
    return {
        addOnGatewayTokenChangeListener: async (gatewayToken, tokenDidChange) => {
            return Promise.resolve((0, safecoin_gateway_ts_1.onGatewayTokenChange)(connection, new web3_js_1.PublicKey(gatewayToken.identifier), (token) => {
                tokenDidChange({
                    issuingGatekeeper: token.issuingGatekeeper.toBase58(),
                    gatekeeperNetworkAddress: token.gatekeeperNetwork.toBase58(),
                    owner: token.owner.toBase58(),
                    state: common_gateway_react_1.State[token.state],
                    identifier: token.publicKey.toBase58(),
                    expiryTime: token.expiryTime,
                });
            }));
        },
        removeOnGatewayTokenChangeListener: (listenerId) => {
            (0, safecoin_gateway_ts_1.removeAccountChangeListener)(connection, listenerId);
        },
        findGatewayToken: async () => {
            const onChainToken = await (0, safecoin_gateway_ts_1.findGatewayToken)(connection, publicKey, new web3_js_1.PublicKey(gatekeeperNetworkAddress));
            if (!onChainToken)
                return undefined;
            return {
                issuingGatekeeper: onChainToken.issuingGatekeeper.toBase58(),
                gatekeeperNetworkAddress: onChainToken.gatekeeperNetwork.toBase58(),
                owner: onChainToken.owner.toBase58(),
                state: common_gateway_react_1.State[onChainToken.state],
                identifier: onChainToken.publicKey.toBase58(),
                expiryTime: onChainToken.expiryTime,
            };
        },
        proveWalletOwnership: async () => {
            const result = await (0, prove_safecoin_wallet_1.prove)(publicKey, signTransaction, (0, config_1.makeConfig)(clusterUrl, cluster));
            return result.toString('base64');
        },
        handleUserSignedTransaction: async (partiallySignedTx) => {
            if (handleTransaction) {
                await handleTransaction(createsafecoinTransactionFromBase64(partiallySignedTx));
            }
            // The user can still request broadcastTransaction to be false and then
            // useGateway to instead retrieve the GatewayTokenTransaction instead of
            // using a callback. The callback is optional so ignore it if it has not been supplied
        },
        chainType: common_gateway_react_1.ChainType.safecoin,
        httpConfig: {
            baseUrl: (0, config_1.getGatekeeperEndpoint)(stage),
            queryParams: { network: cluster },
            headers: { 'X-Civic-Client': version_1.VERSION },
        },
    };
};
exports.chainImplementation = chainImplementation;
const usesafecoinGateway = () => {
    const { gatewayToken, gatewayTokenTransaction } = (0, common_gateway_react_1.useGateway)();
    const safecoinGatewayToken = gatewayToken
        ? {
            issuingGatekeeper: new web3_js_1.PublicKey(gatewayToken.issuingGatekeeper),
            gatekeeperNetworkAddress: new web3_js_1.PublicKey(gatewayToken.gatekeeperNetworkAddress),
            owner: new web3_js_1.PublicKey(gatewayToken.owner),
            state: gatewayToken.state,
            publicKey: new web3_js_1.PublicKey(gatewayToken.identifier),
            expiryTime: gatewayToken.expiryTime,
        }
        : undefined;
    const safecoinGatewayTokenTransaction = gatewayTokenTransaction
        ? createsafecoinTransactionFromBase64(gatewayTokenTransaction)
        : undefined;
    return Object.assign(Object.assign({}, (0, common_gateway_react_1.useGateway)()), { gatewayToken: safecoinGatewayToken, gatewayTokenTransaction: safecoinGatewayTokenTransaction });
};
exports.usesafecoinGateway = usesafecoinGateway;
