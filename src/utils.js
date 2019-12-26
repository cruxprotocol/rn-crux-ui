import map from 'lodash.map';

const getCruxPaySubdomain = (input: string) => {
    return input.split('@')[0];
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


export {
    getCruxWebViewInput,
};
