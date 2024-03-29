function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { View } from 'react-native';
import { RegexText, Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { urlRegexStrict } from '@sendbird/uikit-utils';
import { useLocalization, useSendbirdChat, useUserProfile } from '../../../hooks/useContext';
import SBUUtils from '../../../libs/SBUUtils';
const BaseUserMessage = _ref => {
  let {
    message,
    variant,
    pressed,
    children,
    onLongPressMentionedUser,
    onLongPressURL
  } = _ref;
  const {
    mentionManager,
    currentUser
  } = useSendbirdChat();
  const {
    show
  } = useUserProfile();
  const {
    STRINGS
  } = useLocalization();
  const {
    colors,
    palette
  } = useUIKitTheme();
  const color = colors.ui.groupChannelMessage[variant][pressed ? 'pressed' : 'enabled'];
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: color.background
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.wrapper
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
          index,
          keyPrefix
        } = _ref2;
        const user = (_message$mentionedUse = message.mentionedUsers) === null || _message$mentionedUse === void 0 ? void 0 : _message$mentionedUse.find(it => it.userId === groups[2]);
        if (user) {
          return /*#__PURE__*/React.createElement(Text, _extends({}, parentProps, {
            key: `${keyPrefix}-${index}`,
            onPress: () => show(user),
            onLongPress: onLongPressMentionedUser,
            style: [parentProps === null || parentProps === void 0 ? void 0 : parentProps.style, {
              fontWeight: 'bold'
            }, user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) && {
              backgroundColor: palette.highlight
            }]
          }), `${mentionManager.asMentionedMessageText(user)}`);
        }
        return match;
      }
    }, {
      regex: urlRegexStrict,
      replacer(_ref3) {
        let {
          match,
          parentProps,
          index,
          keyPrefix
        } = _ref3;
        return /*#__PURE__*/React.createElement(Text, _extends({}, parentProps, {
          key: `${keyPrefix}-${index}`,
          onPress: () => SBUUtils.openURL(match),
          onLongPress: onLongPressURL,
          style: [parentProps === null || parentProps === void 0 ? void 0 : parentProps.style, {
            textDecorationLine: 'underline'
          }]
        }), match);
      }
    }]
  }, mentionManager.shouldUseMentionedMessageTemplate(message) ? message.mentionedMessageTemplate : message.message), Boolean(message.updatedAt) && /*#__PURE__*/React.createElement(Text, {
    body3: true,
    color: color.textEdited
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_EDITED_POSTFIX))), children);
};
const styles = createStyleSheet({
  container: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6
  }
});
export default BaseUserMessage;
//# sourceMappingURL=BaseUserMessage.js.map