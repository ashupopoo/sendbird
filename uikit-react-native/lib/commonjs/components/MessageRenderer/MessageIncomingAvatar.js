"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageIncomingAvatar = _ref => {
  var _message$sender;
  let {
    message,
    grouping
  } = _ref;
  const {
    show
  } = (0, _useContext.useUserProfile)();
  if (grouping) return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.avatar
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.avatar
  }, (message.isFileMessage() || message.isUserMessage()) && /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: () => show(message.sender)
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, {
    size: 26,
    uri: (_message$sender = message.sender) === null || _message$sender === void 0 ? void 0 : _message$sender.profileUrl
  })));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  avatar: {
    width: 26,
    marginRight: 12
  }
});
var _default = MessageIncomingAvatar;
exports.default = _default;
//# sourceMappingURL=MessageIncomingAvatar.js.map