"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSolanaGateway = exports.SolanaGatewayProvider = void 0;
// @ts-ignore
const react_1 = __importStar(require("react"));
const common_gateway_react_1 = require("@civic/common-gateway-react");
const chainImplementation_1 = require("./chainImplementation");
const SolanaGatewayProvider = ({ children = null, wallet, clusterUrl, cluster = 'mainnet-beta', gatekeeperNetwork, wrapper, logo, stage = 'prod', redirectUrl, broadcastTransaction = true, handleTransaction, options = { autoShowModal: true }, }) => {
    var _a, _b;
    const chainImpl = (0, react_1.useMemo)(() => {
        if ((wallet === null || wallet === void 0 ? void 0 : wallet.publicKey) && gatekeeperNetwork) {
            const { publicKey, signTransaction } = wallet;
            return (0, chainImplementation_1.chainImplementation)({
                clusterUrl,
                cluster,
                publicKey,
                signTransaction,
                gatekeeperNetworkAddress: gatekeeperNetwork,
                stage,
                handleTransaction,
            });
        }
        return undefined;
    }, [clusterUrl, cluster, (_a = wallet === null || wallet === void 0 ? void 0 : wallet.publicKey) === null || _a === void 0 ? void 0 : _a.toBase58(), gatekeeperNetwork === null || gatekeeperNetwork === void 0 ? void 0 : gatekeeperNetwork.toBase58(), stage]);
    const walletAdapter = (0, react_1.useMemo)(() => {
        if (wallet === null || wallet === void 0 ? void 0 : wallet.publicKey) {
            const { publicKey } = wallet;
            return { publicKey: publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58() };
        }
        return undefined;
    }, [(_b = wallet === null || wallet === void 0 ? void 0 : wallet.publicKey) === null || _b === void 0 ? void 0 : _b.toBase58()]);
    if (walletAdapter && chainImpl) {
        common_gateway_react_1.logger.info('Client Options', options);
        return (react_1.default.createElement(common_gateway_react_1.GatewayProvider, { wallet: walletAdapter, stage: stage, chainImplementation: chainImpl, gatekeeperNetwork: gatekeeperNetwork === null || gatekeeperNetwork === void 0 ? void 0 : gatekeeperNetwork.toBase58(), wrapper: wrapper, logo: logo, redirectUrl: redirectUrl, ownerSigns: !broadcastTransaction, options: options }, children));
    }
    return react_1.default.createElement(react_1.default.Fragment, null, children);
};
exports.SolanaGatewayProvider = SolanaGatewayProvider;
var chainImplementation_2 = require("./chainImplementation");
Object.defineProperty(exports, "useSolanaGateway", { enumerable: true, get: function () { return chainImplementation_2.useSolanaGateway; } });
__exportStar(require("./types"), exports);
