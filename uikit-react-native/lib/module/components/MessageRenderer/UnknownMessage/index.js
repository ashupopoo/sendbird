import React from 'react';
import { View } from 'react-native';
import { Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useLocalization } from '../../../hooks/useContext';
const UnknownMessage = _ref => {
  let {
    message,
    variant,
    pressed
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  const color = colors.ui.groupChannelMessage[variant][pressed ? 'pressed' : 'enabled'];
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: color.background
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    body3: true,
    color: colors.onBackground01
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_UNKNOWN_TITLE(message)), /*#__PURE__*/React.createElement(Text, {
    body3: true,
    color: colors.onBackground02
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_UNKNOWN_DESC(message)));
};
const styles = createStyleSheet({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  }
});
export default UnknownMessage;
//# sourceMappingURL=index.js.map