# Gateway React Component

- [Getting started](#overview)
- [Official Documentation](#official-documentation)
- [Example Project](#example-project)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Overview

Civic provides a developer-friendly plug and play React Component as an easy way to request a Gateway Token from your dApp with minimal setup. It includes a Civic Pass status widget, the Identity Button; and an in-dApp modal to guide your users through the process.

## Official Documentation

You can find the official documentation hosted on [Gitbook](https://docs.civic.com/).

## Example Project

We have also created an example React project that shows how you would go about integrating the different features provided by our `@civic/solana-gateway-react` component project on [Github](https://github.com/civicteam/civic-pass-template).

## Getting started

Please refer to the project on [Github](https://github.com/civicteam/civic-pass-template) for a complete example.

### 1. Install the component

```bash
npm i @civic/solana-gateway-react
```

or using `yarn`

```bash
yarn add @civic/solana-gateway-react
```

### 2. Include the gateway context
Surround any code that needs access to the gateway token with:

```typescript jsx
import { GatewayProvider } from "@civic/solana-gateway-react";

<GatewayProvider
  cluster="devnet"
	wallet={wallet}
	gatekeeperNetwork={gatekeeperNetwork}>
</GatewayProvider>

```

where:

- `wallet` contains `publicKey` and `signTransaction` (see below)
- `gatekeeperNetwork` is a Solana publicKey provided by the dApp
- `cluster` is the Solana network to use, i.e. devnet, mainnet-beta, testnet

### 3. Accessing or requesting the gateway token
The component will automatically look for a gateway token on chain. To access it once created:

```typescript
import { useGateway } from "@civic/solana-gateway-react";
const { gatewayToken } = useGateway()
```

If the wallet does not have a gateway token, request it using `requestGatewayToken`:

```typescript
const { requestGatewayToken } = useGateway()
```

For example, by connecting it to a button component:

```typescript jsx
<button onclick={requestGatewayToken}>Validate your wallet</button>
```

Or by using Identity Button provided:

```typescript jsx
import IdentityButton from './lib/button/IdentityButton';
...
<IdentityButton />

```

### 4. 'Verified by Civic' badge

A badge is provided that looks for a gateway token on-chain and displays a 'check icon' ( to indicate verified by civic status ) if one is found.

This does not query the Civic gatekeeper, only the blockchain.

Currently this is only supported for Solana.

The wallet and gatekeeperNetwork are `PublicKey` types from `@solana/web3.js` .

The `clusterName` defaults to `mainnet-beta` but can be any one of:

`mainnet-beta`, `testnet`, `devnet`, `civicnet`, `localnet` .

```typescript jsx

import { Badge } from '@civic/solana-gateway-react';

<Badge
  clusterName="mainnet-beta"
  gatekeeperNetwork={gatekeeperNetworkPublicKey}
  publicKey={publicKey}
/>

```

### 5. IdentityButton behaviour

The IdentityButton is a reference implementation of a UI component to communicate to your dApp users the current status of their Gateway Token, or Gateway Token request. It changes appearance with text and icons to indicate when the user needs to take action and can be clicked by the user at any point in the process. The initial click for a new user will initiate the flow for the user to create a new Gateway Token. Once the user has gone through KYC and submitted their Gateway Token request via the Civic compliance iFrame, any subsequent click will launch the Civic Pass iframe with a screen describing the current status of the flow.


## API Documentation

### GatewayProvider
The `GatewayProvider` is a React component that gives children access to the GatewayContext through the `useGateway` function. This component holds the state for a given gateway token or gateway token request.

```typescript

export type GatewayProviderProps = {
  wallet?: WalletAdapter; // the wallet connected to the dApp, can be null initially pre-user wallet connection
  gatekeeperNetwork?: PublicKey; // the gatekeeper network public key
  stage?: string; // optionally set Civic gatekeeper stage (testing only), defaults to 'prod'
  clusterUrl: string; // optionally pass a Solana cluster URL, defaults to solana mainnet
  cluster?: string; // The cluster name. Defaults to mainnet-beta
  wrapper?: React.FC; // a react element that the dApp can wrap the iframe in to allow customer dApp styling
  logo?: string; // optional url of your logo that will be shown, if set, during verification
  redirectUrl?: string; // a redirect URL that can be used for deep-linking and mobile-web
  broadcastTransaction?: boolean; // the react component will broadcast the transaction. Defaults to true
  handleTransaction?: (transaction: Transaction) => Promise<void>; // callback that will be invoked with a partial or fully signed transaction
  options?: Options; // a set of UI options
};

```

### GatewayStatus
The `GatewayStatus` is an enum that reveals the state of the requested Gateway Token.

```typescript
export enum GatewayStatus {
  UNKNOWN,
  CHECKING,
  NOT_REQUESTED,
  COLLECTING_USER_INFORMATION,
  PROOF_OF_WALLET_OWNERSHIP,
  IN_REVIEW,
  REJECTED,
  REVOKED,
  FROZEN,
  ACTIVE,
  ERROR,
  LOCATION_NOT_SUPPORTED,
  VPN_NOT_SUPPORTED,
  REFRESH_TOKEN_REQUIRED,
  VALIDATING_USER_INFORMATION,
  USER_INFORMATION_VALIDATED,
  USER_INFORMATION_REJECTED,
}
```

The behaviour of the React component depends on the status of the token. For example, if the token status is `NOT_REQUESTED` and the user triggers the react component, then the flow to collect the user's information and request a Civic Token will be started.

For other cases, like the token status `FROZEN`, triggering the React component opens a dialog explaining to the user the current status and offering him to reach out to Civic is he requires assistance.

The table bellow lists all status:

| Status        | Description | Behaviour when triggered
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------
| `UNKNOWN`       | No user wallet is connected or no gatekeeper network set     | *None* |
| `CHECKING`      | The Identity Component is making the relevant requests to check the state of the token      | *None* |
| `NOT_REQUESTED` | A token has not been requested  | Opens the Civic Pass modal dialog and initiates the token request flow |
| `COLLECTING_USER_INFORMATION` | The Identity Component is in progress and can be resumed | Opens the Civic Pass modal dialog and resumes the token request flow|
| `IN_REVIEW` | The token has been requested and the Gatekeeper is reviewing the request | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `ACTIVE` | The token has been issued successfully and is active. | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `FROZEN` | The token has been frozen, for example because the user connected from a blocked IP | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `REJECTED` | The token requests has been rejected by the Gatekeeper | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `REVOKED` | The token has been revoked, for example because the user connected from a banned IP | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `LOCATION_NOT_SUPPORTED` | The user's location is not currently supported | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `VPN_NOT_SUPPORTED` | The user is using a proxy or VPN | Opens the Civic Pass modal dialog with a user-friendly explanation of the status. |
| `REFRESH_TOKEN_REQUIRED` | The user needs to refresh their gateway token | Opens the Civic Pass modal dialog and takes the user through the flow for refreshing their token. |
| `ERROR` | There was an error retrieving the Gateway Token or completing a vrification flow | Opens the Civic Pass modal dialog and the user can restart the process. |
| `VALIDATING_USER_INFORMATION` | The validation process is currently being reviewed | Opens the Civic Pass modal dialog and shows a user friendly message |
| `VALIDATION_PROCESS_IN_PROGRESS` | The validation process is still in progress | Opens the Civic Pass modal dialog and the user can resume the process |
| `USER_INFORMATION_VALIDATED` | The validation process has completed | Opens the Civic Pass modal dialog and completes the process |
| `USER_INFORMATION_REJECTED` | The validation process was rejected | Opens the Civic Pass modal explaing the reasons for the failure |

### WalletAdapter
The wallet passed to the GatewayProvider must implement the WalletAdapter interface. By providing a publicKey (this will be linked with the GatewayToken), and a 'sign' function to prove wallet ownership:

```typescript
export interface WalletAdapter {
  publicKey?: PublicKey;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
}
```

### useGateway

Any component wrapped by `GatewayProvider` can access the state and useful functions of the GatewayProvider through this function.

Returns the current context values for the `GatewayContext` by exposing the following properties.

```typescript
export type GatewayProps = {
  requestGatewayToken: () => Promise<void>, // starts off gateway token process
  gatewayStatus: GatewayStatus, // normally a value from a React hook state, defaults to GatewayStatus.UNKNOWN
  gatewayToken?: GatewayToken, // the current GatewayToken used in the dApp
  gatewayTokenTransaction: string, // if broadcastTransaction is false, this will be populated with any transactions generated by the backend
}

const gatewayProps: GatewayProps = useGateway();
```

### Client options

You can specify some options that affect the display behaviour of the Civic modal that the user interacts with:

```typescript
export type Options = {
  autoShowModal: boolean; // whether the Civic modal should appear automatically if the Civic Pass token state changes
};
```

### Wrapper

You can customise how the verification flow is displayed by providing a custom wrapper.

```typescript
...
const customWrapperStyle: CSS.Properties = {
  backgroundColor: 'rgba(0,0,0,1)',
  position: 'fixed',
  zIndex: 999,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  paddingTop: '5%'
}

const customWrapperContentStyle: CSS.Properties = {
  backgroundColor: '#fefefe',
  margin: 'auto',
  width: '90%',
  position: 'relative',
}

export const CustomWrapper: React.FC = ({ children = null }) => {
  return (
    <div style={customWrapperStyle}>
      <div style={customWrapperContentStyle}>
        <img style={{ maxWidth: '20%' }} src={logo} className="app-logo" alt="logo"/>
        {children}
      </div>
    </div>
  )
}

```

## Contributing

### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn publish`

Publishes a new version of the React Component. We use beta releases before releasing an official release in the following format `(major).(minor).(patch)-beta.(build number)`. You can release a beta with the following command `yarn add @civic/solana-gateway-react@beta`.

### Automated publishing

To publish a new version of the react-component, add a Git tag and use a prefix along with the desired version number e.g.
```
solana-rc-0.7.0
```
Note that this method should only be used for production versions, not beta tags.

