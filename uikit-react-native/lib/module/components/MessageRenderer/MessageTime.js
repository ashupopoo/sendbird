import React from 'react';
import { View } from 'react-native';
import { Text, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useLocalization } from '../../hooks/useContext';
const MessageTime = _ref => {
  let {
    message,
    grouping,
    style
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  if (grouping) return null;
  return /*#__PURE__*/React.createElement(View, {
    style: style
  }, /*#__PURE__*/React.createElement(Text, {
    caption4: true,
    color: colors.ui.groupChannelMessage.incoming.enabled.textTime
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_TIME(message)));
};
export default MessageTime;
//# sourceMappingURL=MessageTime.js.map