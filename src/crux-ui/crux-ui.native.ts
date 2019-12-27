
export interface IAddress {
    addressHash: string;
    secIdentifier?: string;
}

export interface ICruxWebViewInputExtension {
    theme?: string;
    availableCurrencies: Object;
    suggestedCruxIDSubdomain?: string;
}

export interface ICruxUIOptions {
    cruxRouteName?: string;
    cruxClient: Object;
    inputExtension: ICruxWebViewInputExtension;
    navigation: Object;
    onClosePress: Function;
    onRegisterSuccess: Function;
    onPutAddressSuccess: Function;
    onError: Function;
}

export class CruxUI {

    // private _pageTitle;
    private _cruxRouteName;
    private _cruxClient;
    private _inputExtension;
    private _onClosePress;
    private _onRegisterSuccess;
    private _onPutAddressSuccess;
    private _onError;
    private _navigation;

    constructor(options: ICruxUIOptions) {
        // this._pageTitle = 'Register CRUX ID';
        // if (options.inputExtension && options.inputExtension.cruxIDSubdomain) {
        //     this._pageTitle = 'Manage CRUX ID';
        // }

        this._cruxRouteName = options.cruxRouteName || "CRUXPAY_INJECTED_SCREEN";
        this._cruxClient = options.cruxClient;
        this._inputExtension = options.inputExtension;
        this._navigation = options.navigation;
        this._onClosePress = options.onClosePress;
        this._onRegisterSuccess = options.onRegisterSuccess;
        this._onPutAddressSuccess = options.onPutAddressSuccess;
        this._onError = options.onError;
    }

    public manage = () => {
        return this._navigation.navigate(this._cruxRouteName, {
            // pageTitle: this._pageTitle,
            onClosePress: this._onClosePress,
            onRegisterSuccess: this._onRegisterSuccess,
            onPutAddressSuccess: this._onPutAddressSuccess,
            onError: this._onError,
            inputExtension: this._inputExtension,
            cruxClient: this._cruxClient,
        })
    }

}
