## RN-CRUX-UI


#### Usage

1. Import `CruxScreen` and add it preferably against a string `CRUXPAY_INJECTED_SCREEN` in [Route Configuration object](https://reactnavigation.org/docs/en/hello-react-navigation.html#route-configuration-shorthand)
2. Initialize the `RNCruxUI.CruxUI` object with [options](#icruxuioptions) object
```javascript
const cruxui = new RNCruxUI.CruxUI(options);
```
3. Use the `manage` method of the `cruxui` object to automatically open the register/manage CRUX ID screen according to the state of the inputs provided.
 

#### ICruxUIOptions

The options object expects these keys to be defined 
1. `cruxRouteName` => The name of the screen constant against which the `CruxScreen` will be hooked up in Route Configuration.
2. `cruxClient` => An instantiated object of [rn-sdk's](https://github.com/cruxprotocol/rn-sdk) CruxClient class.
3. `navigation` => The [Navigation](https://reactnavigation.org/docs/en/navigation-prop.html) prop of the integrating app.
4. `onRegisterSuccess` & `onPutAddressSuccess` => Functions to be called on success of `registerCruxID` and `putAddressMap` functions of cruxClient
5. `onClosePress` => Function to be called onclosing the webview.
6. `onError` => Any error thrown by `registerCruxID` & `putAddressMap` will call this function
7. `inputExtension` => [ICruxWebViewInputExtension](#icruxwebviewinputextension)

#### ICruxWebViewInputExtension
 These are some params which integrator app needs to send to open the webview of [crux-ui-setup](https://github.com/cruxprotocol/crux-ui-setup)
 1. `theme` => The theme of the buttons
 2. `suggestedCruxIDSubdomain` => Any preferred CRUX ID Subdomain that the user woul prefer tp register
 3. `availableCurrencies` => A map of wallet's currency symbol and corresponding address in `IAddress` format 
