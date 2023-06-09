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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnection = exports.safecoinConnectionProvider = exports.getsafecoinConnection = void 0;
// @ts-ignore
const react_1 = __importStar(require("react"));
const common_gateway_react_1 = require("@civic/common-gateway-react");
const web3_js_1 = require("@safecoin/web3.js");
const R = __importStar(require("ramda"));
const ConnectionContext = react_1.default.createContext(null);
exports.getsafecoinConnection = R.memoizeWith(R.identity, (clusterUrl) => {
    common_gateway_react_1.logger.debug('new safecoin connection created using clusterUrl', clusterUrl);
    return new web3_js_1.Connection(clusterUrl, 'processed');
});
function safecoinConnectionProvider({ children = null, endpoint, }) {
    const connection = (0, react_1.useMemo)(() => (0, exports.getsafecoinConnection)(endpoint), [endpoint]);
    // The websocket library safecoin/web3.js uses closes its websocket connection when the subscription list
    // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
    // This is a hack to prevent the list from ever getting empty
    (0, react_1.useEffect)(() => {
        const id = connection.onAccountChange(web3_js_1.Keypair.generate().publicKey, () => { });
        return () => {
            connection.removeAccountChangeListener(id);
        };
    }, [connection]);
    (0, react_1.useEffect)(() => {
        const id = connection.onSlotChange(() => null);
        return () => {
            connection.removeSlotChangeListener(id);
        };
    }, [connection]);
    return (react_1.default.createElement(ConnectionContext.Provider, { value: {
            endpoint,
            connection,
        } }, children));
}
exports.safecoinConnectionProvider = safecoinConnectionProvider;
function useConnection() {
    const context = (0, react_1.useContext)(ConnectionContext);
    if (!context) {
        throw new Error('Missing connection context');
    }
    return context.connection;
}
exports.useConnection = useConnection;
