import React from 'react';
import { Pressable, View } from 'react-native';
import { Avatar, createStyleSheet } from '@sendbird/uikit-react-native-foundation';
import { useUserProfile } from '../../hooks/useContext';
const MessageIncomingAvatar = _ref => {
  var _message$sender;
  let {
    message,
    grouping
  } = _ref;
  const {
    show
  } = useUserProfile();
  if (grouping) return /*#__PURE__*/React.createElement(View, {
    style: styles.avatar
  });
  return /*#__PURE__*/React.createElement(View, {
    style: styles.avatar
  }, (message.isFileMessage() || message.isUserMessage()) && /*#__PURE__*/React.createElement(Pressable, {
    onPress: () => show(message.sender)
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: 26,
    uri: (_message$sender = message.sender) === null || _message$sender === void 0 ? void 0 : _message$sender.profileUrl
  })));
};
const styles = createStyleSheet({
  avatar: {
    width: 26,
    marginRight: 12
  }
});
export default MessageIncomingAvatar;
//# sourceMappingURL=MessageIncomingAvatar.js.map