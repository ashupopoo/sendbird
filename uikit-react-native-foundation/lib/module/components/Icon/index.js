import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import IconAssets from '../../assets/icon';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const Icon = _ref => {
  let {
    icon,
    color,
    size = 24,
    containerStyle,
    style
  } = _ref;
  const sizeStyle = sizeStyles[size] ?? {
    width: size,
    height: size
  };
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: [containerStyle, containerStyles.container]
  }, /*#__PURE__*/React.createElement(Image, {
    resizeMode: 'contain',
    source: IconAssets[icon],
    style: [{
      tintColor: color ?? colors.primary
    }, sizeStyle, style]
  }));
};
const containerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const sizeStyles = createStyleSheet({
  16: {
    width: 16,
    height: 16
  },
  20: {
    width: 20,
    height: 20
  },
  24: {
    width: 24,
    height: 24
  },
  28: {
    width: 28,
    height: 28
  },
  32: {
    width: 32,
    height: 32
  }
});
Icon.Assets = IconAssets;
export default Icon;
//# sourceMappingURL=index.js.map