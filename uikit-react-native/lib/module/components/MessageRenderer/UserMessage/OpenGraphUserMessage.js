function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Image, RegexText, Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { conditionChaining, urlRegexRough } from '@sendbird/uikit-utils';
import { useLocalization, useSendbirdChat, useUserProfile } from '../../../hooks/useContext';
import SBUUtils from '../../../libs/SBUUtils';
const OpenGraphUserMessage = _ref => {
  var _ogMetaData$defaultIm;
  let {
    message,
    variant,
    pressed,
    ogMetaData,
    children,
    onLongPressMentionedUser,
    onLongPressURL
  } = _ref;
  const {
    mentionManager,
    currentUser
  } = useSendbirdChat();
  const {
    STRINGS
  } = useLocalization();
  const {
    show
  } = useUserProfile();
  const {
    colors,
    select,
    palette
  } = useUIKitTheme();
  const [imageNotFound, setImageNotFound] = useState(false);
  const color = colors.ui.groupChannelMessage[variant][pressed ? 'pressed' : 'enabled'];
  const containerBackground = select({
    dark: palette.background400,
    light: palette.background100
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.bubbleContainer, {
      backgroundColor: containerBackground
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.container, styles.bubbleContainer, {
      backgroundColor: color.background
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.messageContainer
  }, /*#__PURE__*/React.createElement(Text, {
    body3: true,
    color: color.textMsg
  }, /*#__PURE__*/React.createElement(RegexText, {
    body3: true,
    color: color.textMsg,
    patterns: [{
      regex: mentionManager.templateRegex,
      replacer(_ref2) {
        var _message$mentionedUse;
        let {
          match,
          groups,
          parentProps,
          keyPrefix,
          index
        } = _ref2;
        const user = (_message$mentionedUse = message.mentionedUsers) === null || _message$mentionedUse === void 0 ? void 0 : _message$mentionedUse.find(it => it.userId === groups[2]);
        if (user) {
          const isCurrentUser = user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId);
          return /*#__PURE__*/React.createElement(Text, _extends({}, parentProps, {
            key: `${keyPrefix}-${index}`,
            onPress: () => show(user),
            onLongPress: onLongPressMentionedUser,
            style: [parentProps === null || parentProps === void 0 ? void 0 : parentProps.style, styles.mentionedText, isCurrentUser && {
              backgroundColor: palette.highlight
            }]
          }), `${mentionManager.asMentionedMessageText(user)}`);
        }
        return match;
      }
    }, {
      regex: urlRegexRough,
      replacer(_ref3) {
        let {
          match,
          parentProps,
          keyPrefix,
          index
        } = _ref3;
        return /*#__PURE__*/React.createElement(Text, _extends({}, parentProps, {
          key: `${keyPrefix}-${index}`,
          onPress: () => SBUUtils.openURL(match),
          onLongPress: onLongPressURL,
          style: [parentProps === null || parentProps === void 0 ? void 0 : parentProps.style, styles.urlText]
        }), match);
      }
    }]
  }, mentionManager.shouldUseMentionedMessageTemplate(message) ? message.mentionedMessageTemplate : message.message), Boolean(message.updatedAt) && /*#__PURE__*/React.createElement(Text, {
    body3: true,
    color: color.textEdited
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_EDITED_POSTFIX))), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: {
      backgroundColor: select({
        dark: palette.background500,
        light: palette.background200
      })
    },
    activeOpacity: 0.85,
    onPress: () => SBUUtils.openURL(ogMetaData.url)
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.ogImageContainer, {
      backgroundColor: select({
        dark: palette.background500,
        light: palette.background200
      })
    }]
  }, conditionChaining([imageNotFound], [/*#__PURE__*/React.createElement(Icon, {
    containerStyle: styles.ogImage,
    icon: 'thumbnail-none',
    size: 48,
    color: colors.onBackground02
  }), /*#__PURE__*/React.createElement(Image, {
    source: {
      uri: (_ogMetaData$defaultIm = ogMetaData.defaultImage) === null || _ogMetaData$defaultIm === void 0 ? void 0 : _ogMetaData$defaultIm.url
    },
    style: styles.ogImage,
    resizeMode: 'cover',
    onError: () => setImageNotFound(true)
  })])), /*#__PURE__*/React.createElement(View, {
    style: [styles.ogContainer, {
      backgroundColor: containerBackground
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 3,
    body2: true,
    color: colors.onBackground01,
    style: styles.ogTitle
  }, ogMetaData.title), Boolean(ogMetaData.description) && /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 1,
    caption2: true,
    color: colors.onBackground01,
    style: styles.ogDesc
  }, ogMetaData.description), /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 1,
    caption2: true,
    color: colors.onBackground02
  }, ogMetaData.url)))), children);
};
const styles = createStyleSheet({
  bubbleContainer: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  container: {
    width: 240,
    maxWidth: 240
  },
  messageContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  ogContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12
  },
  ogImageContainer: {
    flex: 1,
    height: 136
  },
  ogImage: {
    width: '100%',
    height: '100%'
  },
  ogTitle: {
    marginBottom: 4
  },
  ogDesc: {
    lineHeight: 14,
    marginBottom: 8
  },
  mentionedText: {
    fontWeight: 'bold'
  },
  urlText: {
    textDecorationLine: 'underline'
  }
});
export default OpenGraphUserMessage;
//# sourceMappingURL=OpenGraphUserMessage.js.map