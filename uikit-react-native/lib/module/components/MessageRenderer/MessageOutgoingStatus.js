import React from 'react';
import { useMessageOutgoingStatus } from '@sendbird/uikit-chat-hooks';
import { Icon, LoadingSpinner, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useSendbirdChat } from '../../hooks/useContext';
const SIZE = 16;
const MessageOutgoingStatus = _ref => {
  let {
    channel,
    message
  } = _ref;
  if (!message.isUserMessage() && !message.isFileMessage()) return null;
  const {
    sdk
  } = useSendbirdChat();
  const {
    colors
  } = useUIKitTheme();
  const outgoingStatus = useMessageOutgoingStatus(sdk, channel, message);
  if (outgoingStatus === 'PENDING') {
    return /*#__PURE__*/React.createElement(LoadingSpinner, {
      size: SIZE,
      style: styles.container
    });
  }
  if (outgoingStatus === 'FAILED') {
    return /*#__PURE__*/React.createElement(Icon, {
      icon: 'error',
      size: SIZE,
      color: colors.error,
      style: styles.container
    });
  }
  if (outgoingStatus === 'READ') {
    return /*#__PURE__*/React.createElement(Icon, {
      icon: 'done-all',
      size: SIZE,
      color: colors.secondary,
      style: styles.container
    });
  }
  if (outgoingStatus === 'UNREAD' || outgoingStatus === 'DELIVERED') {
    return /*#__PURE__*/React.createElement(Icon, {
      icon: 'done-all',
      size: SIZE,
      color: colors.onBackground03,
      style: styles.container
    });
  }
  if (outgoingStatus === 'UNDELIVERED') {
    return /*#__PURE__*/React.createElement(Icon, {
      icon: 'done',
      size: SIZE,
      color: colors.onBackground03,
      style: styles.container
    });
  }
  return null;
};
const styles = createStyleSheet({
  container: {
    marginRight: 4
  }
});
export default /*#__PURE__*/React.memo(MessageOutgoingStatus);
//# sourceMappingURL=MessageOutgoingStatus.js.map