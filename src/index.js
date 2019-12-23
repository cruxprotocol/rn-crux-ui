// @flow
import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  loading: boolean,
}

type State = {
    loading: boolean,
};

class CruxScreen extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>You are seeing a component developed by CRUXPay Team</Text>
      </View>
    );
  }
}

export default CruxScreen;
