"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../../hooks/useContext");
var _SBUUtils = _interopRequireDefault(require("../../../libs/SBUUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  } = (0, _useContext.useSendbirdChat)();
  const {
    show
  } = (0, _useContext.useUserProfile)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors,
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const color = colors.ui.groupChannelMessage[variant][pressed ? 'pressed' : 'enabled'];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: color.background
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.wrapper
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    body3: true,
    color: color.textMsg
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.RegexText, {
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
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, _extends({}, parentProps, {
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
      regex: _uikitUtils.urlRegexStrict,
      replacer(_ref3) {
        let {
          match,
          parentProps,
          index,
          keyPrefix
        } = _ref3;
        return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, _extends({}, parentProps, {
          key: `${keyPrefix}-${index}`,
          onPress: () => _SBUUtils.default.openURL(match),
          onLongPress: onLongPressURL,
          style: [parentProps === null || parentProps === void 0 ? void 0 : parentProps.style, {
            textDecorationLine: 'underline'
          }]
        }), match);
      }
    }]
  }, mentionManager.shouldUseMentionedMessageTemplate(message) ? message.mentionedMessageTemplate : message.message), Boolean(message.updatedAt) && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    body3: true,
    color: color.textEdited
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_EDITED_POSTFIX))), children);
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6
  }
});
var _default = BaseUserMessage;
exports.default = _default;
//# sourceMappingURL=BaseUserMessage.js.map