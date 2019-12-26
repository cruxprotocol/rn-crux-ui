
export interface CruxUIOptions {
    cruxRouteName: string;
    cruxClient: Object;
    inputExtension: Object;
    navigation: Object;
    onClosePress: Function;
    onRegisterSuccess: Function;
    onPutAddressSuccess: Function;
    getCruxWebViewInput: Function;
}

export class CruxUI {

    private _pageTitle;
    private _cruxRouteName;
    private _cruxClient;
    private _inputExtension;
    private _onClosePress;
    private _onRegisterSuccess;
    private _onPutAddressSuccess;
    private _getCruxWebViewInput;
    private _navigation;

    constructor(options: CruxUIOptions) {
        this._pageTitle = 'Register CRUX ID';
        if (this._inputExtension.cruxIDSubdomain) {
            this._pageTitle = 'Manage CRUX ID';
        }

        this._cruxRouteName = options.cruxRouteName || "CRUXPAY_INJECTED_SCREEN";
        this._cruxClient = options.cruxClient;
        this._inputExtension = options.inputExtension;
        this._navigation = options.navigation;
        this._onClosePress = options.onClosePress;
        this._onRegisterSuccess = options.onRegisterSuccess;
        this._onPutAddressSuccess = options.onPutAddressSuccess;
        this._getCruxWebViewInput = options.getCruxWebViewInput;
    }

    public manage = () => {
        return this._navigation.navigate(this._cruxRouteName, {
            pageTitle: this._pageTitle,
            onClosePress: this._onClosePress,
            onRegisterSuccess: this._onRegisterSuccess,
            onPutAddressSuccess: this._onPutAddressSuccess,
            inputExtension: this._inputExtension,
            cruxClient: this._cruxClient,
            getCruxWebViewInput: this._getCruxWebViewInput,
        })
    }

}
