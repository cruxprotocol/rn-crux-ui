import map from 'lodash.map';

const getCruxPaySubdomain = (cruxIDInput: string) => {
    return cruxIDInput.split('@')[0];
};

const getCruxWebViewInput = async (cruxClient: Object, inputExtension: Object) => {
    const DEFAULT_THEME = '#3742fa';
    const DEFAULT_EXPERIENCE = 'react-native';
    const { getAssetMap, getAddressMap, walletClientName, getCruxIDState } = cruxClient;
    const subdomainRegistrar = cruxClient._nameService._subdomainRegistrar;
    const theme = DEFAULT_THEME;
    const experience = DEFAULT_EXPERIENCE;
    const cruxIDState = await getCruxIDState();
    const cruxIDSubdomain = cruxIDState && cruxIDState.cruxID ? getCruxPaySubdomain(cruxIDState.cruxID) : '';
    const assetMap = await getAssetMap();
    const assetDetailList = map(assetMap, (value, key) => {
        return value;
    });
    const cruxPayPublicAddressCurrencies = Object.keys(await getAddressMap());
    const clientMapping = {};
    map(assetMap, (value, key) => {
        clientMapping[key] = value.assetId;
    });
    let cruxWebViewInput = {
        theme,
        experience,
        clientMapping,
        cruxIDSubdomain,
        walletClientName,
        subdomainRegistrar,
        assetList: assetDetailList,
        publicAddressCurrencies: cruxPayPublicAddressCurrencies,
    };
    cruxWebViewInput = Object.assign(cruxWebViewInput, inputExtension);
    return cruxWebViewInput;
};

const isValidCruxID = (cruxIDInput: string) => {
    return cruxIDInput.includes('crux') && cruxIDInput.includes('@') && getCruxPaySubdomain(cruxIDInput).length > 3;
};

const getCruxUISetupUrl = (cruxClient: Object) => {
    return 'https://s3-ap-southeast-1.amazonaws.com/files.coinswitch.co/openpay-setup/1.0.1/build/index.html';
    // return 'https://cruxprotocol.github.io/crux-ui-setup/1.0.0/index.html';
};

export {
    getCruxPaySubdomain,
    getCruxWebViewInput,
    isValidCruxID,
    getCruxUISetupUrl,
};
