import React from 'react';
import { View } from 'react-native';
import { Icon, Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useLocalization } from '../../../hooks/useContext';
const iconMapper = {
  audio: 'file-audio',
  image: 'photo',
  video: 'play',
  file: 'file-document'
};
const BaseFileMessage = _ref => {
  let {
    message,
    variant,
    pressed,
    type,
    children
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  const color = colors.ui.groupChannelMessage[variant][pressed ? 'pressed' : 'enabled'];
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.bubbleContainer, {
      backgroundColor: color.background
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: iconMapper[type],
    size: 24,
    containerStyle: {
      backgroundColor: colors.background,
      padding: 2,
      borderRadius: 8,
      marginRight: 8
    }
  }), /*#__PURE__*/React.createElement(Text, {
    body3: true,
    ellipsizeMode: 'middle',
    numberOfLines: 1,
    color: color.textMsg,
    style: styles.name
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_FILE_TITLE(message))), children);
};
const styles = createStyleSheet({
  bubbleContainer: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  name: {
    flexShrink: 1
  }
});
export default BaseFileMessage;
//# sourceMappingURL=BaseFileMessage.js.map