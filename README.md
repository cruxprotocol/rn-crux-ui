## RN-CRUX-UI


#### Usage

1. Import `CruxScreen` and add it preferably against a string `CRUXPAY_INJECTED_SCREEN` in [Route Configuration object](https://reactnavigation.org/docs/en/hello-react-navigation.html#route-configuration-shorthand)
2. Initialize the `RNCruxUI.CruxUI` object
```javascript
const cruxui = new RNCruxUI.CruxUI(options);
```
3. Use the `manage` method of the `cruxui` object to automatically open the register/manage CRUX ID screen according to the state of the inputs provided.
 


