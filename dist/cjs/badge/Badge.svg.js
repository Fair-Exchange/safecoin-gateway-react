"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
// @ts-ignore
const react_1 = __importDefault(require("react"));
exports.default = (_a) => {
    var props = __rest(_a, []);
    return (react_1.default.createElement("svg", Object.assign({ width: "32", height: "32" }, props, { viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" }),
        react_1.default.createElement("g", { filter: "url(#filter0_b_2441_5125)" },
            react_1.default.createElement("circle", { cx: "16", cy: "16", r: "16", fill: "#569AFF" })),
        react_1.default.createElement("path", { d: "M25.3332 12.3006C23.9668 8.56049 20.4885 6.21875 16.333 6.21875C10.9943 6.21875 6.6665 10.6174 6.6665 16.0433C6.6665 21.4693 10.9943 25.8679 16.333 25.8679C20.4244 25.8679 23.9222 23.6323 25.3332 19.9829", stroke: "white", strokeWidth: "1.64398", strokeLinecap: "round" }),
        react_1.default.createElement("path", { d: "M20.4207 13.1055L15.5084 19.0002L12.561 16.5441", stroke: "white", strokeWidth: "1.64398", strokeLinecap: "round", strokeLinejoin: "round" }),
        react_1.default.createElement("defs", null,
            react_1.default.createElement("filter", { id: "filter0_b_2441_5125", x: "-14.4", y: "-14.4", width: "60.8", height: "60.8", filterUnits: "userSpaceOnUse", colorInterpolationFilters: "sRGB" },
                react_1.default.createElement("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
                react_1.default.createElement("feGaussianBlur", { in: "BackgroundImage", stdDeviation: "7.2" }),
                react_1.default.createElement("feComposite", { in2: "SourceAlpha", operator: "in", result: "effect1_backgroundBlur_2441_5125" }),
                react_1.default.createElement("feBlend", { mode: "normal", in: "SourceGraphic", in2: "effect1_backgroundBlur_2441_5125", result: "shape" })))));
};
