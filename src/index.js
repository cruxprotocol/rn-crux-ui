// @flow
import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
import { WebView } from 'react-native-webview';

type Props = {
    navigation: NavigationScreenProp<*>,
}

type State = {
    loading: boolean,
    currentInputData: any,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})

class CruxScreen extends React.PureComponent<Props, State> {
    pageTitle: string
    cruxClient: Object
    onClosePress: Function
    onRegisterSuccess: Function
    onPutAddressSuccess: Function
    getCruxWebViewInput: Function
    inputExtension: Object
    state = {
        loading: true,
        currentInputData: {},
    };

    constructor(props: Props) {
        super(props);
        this.pageTitle = this.props.navigation.getParam('pageTitle', 'Setup CruxPay');
        this.cruxClient = this.props.navigation.state.params.cruxClient;
        this.onClosePress = this.props.navigation.state.params.onClosePress;
        this.onRegisterSuccess = this.props.navigation.state.params.onRegisterSuccess;
        this.onPutAddressSuccess = this.props.navigation.state.params.onPutAddressSuccess;
        this.getCruxWebViewInput = this.props.navigation.state.params.getCruxWebViewInput;
        this.inputExtension = this.props.navigation.state.params.inputExtension;
    }

    handleError(error: any) {
        console.error('CruxPay handleError: ', error);
    }

    componentDidMount = () => {
        this.getCruxWebViewInput(this.cruxClient, this.inputExtension).then((currentInputData) => {
            this.setState({
                loading: false,
                currentInputData,
            });
            // this.props.setBrowsingWebView(true);
        }).catch(this.handleError);
    };

    componentWillUnmount() {
        // this.props.setBrowsingWebView(false);
    }

    cruxPayCallback = async (event: Object) => {

        const { putAddressMap, registerCruxID } = this.cruxClient;
        const parsedPostMessage = JSON.parse(event.nativeEvent.data);
        switch (parsedPostMessage.type) {
            case 'editExisting':
                putAddressMap(parsedPostMessage.data.checkedCurrencies).then(async (map) => {
                    await this.onPutAddressSuccess(map);
                }).catch(this.handleError);
                break;
            case 'createNew':
                registerCruxID(parsedPostMessage.data.newCruxIDSubdomain).then(() => {
                    putAddressMap(parsedPostMessage.data.checkedCurrencies).then(async (map) => {
                        await this.onRegisterSuccess(map);
                    }).catch(this.handleError);
                }).catch(this.handleError);
                break;
            case 'close':
                this.onClosePress();
                break;
            default:
                break;
        }
    };

    render() {
        const {
            loading,
            currentInputData,
        } = this.state;
        const cruxPayURL = 'https://s3-ap-southeast-1.amazonaws.com/files.coinswitch.co/openpay-setup/1.0.1/build/index.html';
        const webviewCallsReact = `window.postMessage(${JSON.stringify(JSON.stringify(currentInputData))}, '*');`;
        return (
            <View style={[styles.container]}>
                {loading && <ActivityIndicator size="large" color="#000000" />}
                {!loading &&
                <WebView
                    clearCache={false}
                    source={{ uri: cruxPayURL }}
                    originWhitelist={['*']}
                    onMessage={this.cruxPayCallback}
                    injectedJavaScript={webviewCallsReact}
                />
                }
            </View>
        );
    }
}

export default CruxScreen;
