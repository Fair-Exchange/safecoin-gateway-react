"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConfig = exports.getGatekeeperEndpoint = exports.GATEKEEPER_ENDPOINTS = void 0;
const safecoinVersionedEndpoint = 'v1/token/safecoin';
exports.GATEKEEPER_ENDPOINTS = {
    local: `http://localhost:3001/local/${safecoinVersionedEndpoint}`,
    test: `https://dev-gatekeeper-api.civic.com/${safecoinVersionedEndpoint}`,
    dev: `https://dev-gatekeeper-api.civic.com/${safecoinVersionedEndpoint}`,
    preprod: `https://preprod-gatekeeper-api.civic.com/${safecoinVersionedEndpoint}`,
    prod: `https://gatekeeper-api.civic.com/${safecoinVersionedEndpoint}`,
};
const getGatekeeperEndpoint = (stage) => {
    const endpoint = exports.GATEKEEPER_ENDPOINTS[stage];
    if (!endpoint) {
        throw new Error(`Invalid stage ${stage}`);
    }
    return endpoint;
};
exports.getGatekeeperEndpoint = getGatekeeperEndpoint;
const makeConfig = (clusterUrl, cluster) => {
    return {
        cluster,
        commitment: 'confirmed',
        // this map instructs the POWO library to use clusterUrl
        // to connect to the safecoin network. This avoids rate limiting issues with using the default
        // public urls
        supportedClusterUrls: {
            [cluster]: clusterUrl,
        },
        recentBlockCheck: false,
        broadcastCheck: false,
    };
};
exports.makeConfig = makeConfig;
