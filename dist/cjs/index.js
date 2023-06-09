"use strict";
/* eslint-disable no-console */
/* eslint-disable global-require */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayProvider = exports.useGateway = exports.Badge = exports.ButtonMode = exports.getTokenDescription = exports.IdentityButton = exports.GatewayStatus = void 0;
const version_1 = require("./version");
var common_gateway_react_1 = require("@civic/common-gateway-react");
Object.defineProperty(exports, "GatewayStatus", { enumerable: true, get: function () { return common_gateway_react_1.GatewayStatus; } });
var common_gateway_react_2 = require("@civic/common-gateway-react");
Object.defineProperty(exports, "IdentityButton", { enumerable: true, get: function () { return common_gateway_react_2.IdentityButton; } });
Object.defineProperty(exports, "getTokenDescription", { enumerable: true, get: function () { return common_gateway_react_2.getTokenDescription; } });
Object.defineProperty(exports, "ButtonMode", { enumerable: true, get: function () { return common_gateway_react_2.ButtonMode; } });
var badge_1 = require("./badge");
Object.defineProperty(exports, "Badge", { enumerable: true, get: function () { return __importDefault(badge_1).default; } });
var chainImplementation_1 = require("./chainImplementation");
Object.defineProperty(exports, "useGateway", { enumerable: true, get: function () { return chainImplementation_1.usesafecoinGateway; } });
var safecoinGatewayProvider_1 = require("./safecoinGatewayProvider");
Object.defineProperty(exports, "GatewayProvider", { enumerable: true, get: function () { return safecoinGatewayProvider_1.safecoinGatewayProvider; } });
console.log(version_1.VERSION);
