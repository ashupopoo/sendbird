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
const MessageIncomingSenderName = _ref => {
  var _message$sender;
  let {
    message,
    grouping
  } = _ref;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  if (grouping) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.sender
  }, (message.isFileMessage() || message.isUserMessage()) && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    caption1: true,
    color: colors.ui.groupChannelMessage.incoming.enabled.textSenderName,
    numberOfLines: 1
  }, ((_message$sender = message.sender) === null || _message$sender === void 0 ? void 0 : _message$sender.nickname) || STRINGS.LABELS.USER_NO_NAME));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  sender: {
    marginLeft: 12,
    marginBottom: 4
  }
});
var _default = MessageIncomingSenderName;
exports.default = _default;
//# sourceMappingURL=MessageIncomingSenderName.js.map