"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CruxUI = /** @class */ (function () {
    function CruxUI(options) {
        var _this = this;
        this.manage = function () {
            return _this._navigation.navigate(_this._cruxRouteName, {
                pageTitle: _this._pageTitle,
                onClosePress: _this._onClosePress,
                onRegisterSuccess: _this._onRegisterSuccess,
                onPutAddressSuccess: _this._onPutAddressSuccess,
                inputExtension: _this._inputExtension,
                cruxClient: _this._cruxClient,
                getCruxWebViewInput: _this._getCruxWebViewInput,
            });
        };
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
    return CruxUI;
}());
exports.CruxUI = CruxUI;
