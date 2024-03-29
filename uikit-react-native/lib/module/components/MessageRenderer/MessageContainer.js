import React from 'react';
import { View } from 'react-native';
import { createStyleSheet } from '@sendbird/uikit-react-native-foundation';
const MessageContainer = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, children);
};
const styles = createStyleSheet({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 16
  }
});
export default MessageContainer;
//# sourceMappingURL=MessageContainer.js.map