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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safecoin_gateway_ts_1 = require("@j0nnyboi/safecoin-gateway-ts");
const web3_js_1 = require("@safecoin/web3.js");
// @ts-ignore
const react_1 = __importStar(require("react"));
const connection_1 = require("../connection");
const Badge_svg_1 = __importDefault(require("./Badge.svg"));
// Used to avoid making multiple blockchain calls when rerendering
function usePrevious(value) {
    const ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}
const Badge = ({ connection, gatekeeperNetwork, publicKey, clusterUrl = (0, web3_js_1.clusterApiUrl)('mainnet-beta'), }) => {
    const [token, setToken] = (0, react_1.useState)();
    const prevGKN = usePrevious(gatekeeperNetwork === null || gatekeeperNetwork === void 0 ? void 0 : gatekeeperNetwork.toBase58());
    const prevPubkey = usePrevious(publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58());
    const prevClusterName = usePrevious(clusterUrl);
    (0, react_1.useEffect)(() => {
        // only make another call if anything changes, as we cannot
        // rely on useEffect to protect us from this
        if ((gatekeeperNetwork === null || gatekeeperNetwork === void 0 ? void 0 : gatekeeperNetwork.toBase58()) !== prevGKN ||
            (publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58()) !== prevPubkey ||
            clusterUrl !== prevClusterName) {
            const normalizedConnection = connection || (0, connection_1.getsafecoinConnection)(clusterUrl);
            // only set the GT if one was found
            (0, safecoin_gateway_ts_1.findGatewayToken)(normalizedConnection, publicKey, gatekeeperNetwork).then((gt) => setToken(gt || undefined));
        }
    }, [gatekeeperNetwork === null || gatekeeperNetwork === void 0 ? void 0 : gatekeeperNetwork.toBase58(), publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58(), clusterUrl, connection]);
    return (token === null || token === void 0 ? void 0 : token.state) === safecoin_gateway_ts_1.State.ACTIVE ? (react_1.default.createElement("a", { href: "https://www.civic.com", target: "_blank", rel: "noreferrer", "data-testid": "badgeLink" },
        react_1.default.createElement(Badge_svg_1.default, null))) : (react_1.default.createElement(react_1.default.Fragment, null));
};
exports.default = Badge;
