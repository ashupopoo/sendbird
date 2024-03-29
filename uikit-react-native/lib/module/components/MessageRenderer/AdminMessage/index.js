import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
const AdminMessage = _ref => {
  let {
    message,
    nextMessage
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const isNextAdmin = nextMessage === null || nextMessage === void 0 ? void 0 : nextMessage.isAdminMessage();
  return /*#__PURE__*/React.createElement(View, {
    style: StyleSheet.flatten([styles.container, isNextAdmin ? styles.nextAdminType : styles.next])
  }, /*#__PURE__*/React.createElement(Text, {
    caption2: true,
    color: colors.onBackground02,
    style: styles.text
  }, message.message));
};
const styles = createStyleSheet({
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center'
  },
  nextAdminType: {
    marginBottom: 8
  },
  next: {
    marginBottom: 16
  },
  text: {
    textAlign: 'center'
  }
});
export default AdminMessage;
//# sourceMappingURL=index.js.map