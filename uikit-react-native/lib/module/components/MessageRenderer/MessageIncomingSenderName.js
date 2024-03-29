import React from 'react';
import { View } from 'react-native';
import { Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useLocalization } from '../../hooks/useContext';
const MessageIncomingSenderName = _ref => {
  var _message$sender;
  let {
    message,
    grouping
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const {
    STRINGS
  } = useLocalization();
  if (grouping) return null;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.sender
  }, (message.isFileMessage() || message.isUserMessage()) && /*#__PURE__*/React.createElement(Text, {
    caption1: true,
    color: colors.ui.groupChannelMessage.incoming.enabled.textSenderName,
    numberOfLines: 1
  }, ((_message$sender = message.sender) === null || _message$sender === void 0 ? void 0 : _message$sender.nickname) || STRINGS.LABELS.USER_NO_NAME));
};
const styles = createStyleSheet({
  sender: {
    marginLeft: 12,
    marginBottom: 4
  }
});
export default MessageIncomingSenderName;
//# sourceMappingURL=MessageIncomingSenderName.js.map