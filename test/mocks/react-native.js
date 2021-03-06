
import React from 'react';
import ReactNativeMocks from 'react-native-mock/build/react-native';

global.ErrorUtils = {
  getGlobalHandler: () => {},
  setGlobalHandler: () => {}
};

function makeRenderable(componentClass, type) {
  return class extends componentClass {
    render() {
      const {children, testID} = this.props;

      return <div type={type} data-test={testID}>{children}</div>;
    }
  };
}


ReactNativeMocks.View = makeRenderable(ReactNativeMocks.View, 'View');
ReactNativeMocks.Text = makeRenderable(ReactNativeMocks.Text, 'Text');
ReactNativeMocks.Platform.select = (obj) => obj.ios;

ReactNativeMocks.NativeModules.RNDeviceInfo = {
  uniqueId: 'unique-id',
  userAgent: 'user-agent'
};

module.exports = ReactNativeMocks;
