"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SIZE = 16;
const MessageOutgoingStatus = _ref => {
  let {
    channel,
    message
  } = _ref;
  if (!message.isUserMessage() && !message.isFileMessage()) return null;
  const {
    sdk
  } = (0, _useContext.useSendbirdChat)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const outgoingStatus = (0, _uikitChatHooks.useMessageOutgoingStatus)(sdk, channel, message);
  if (outgoingStatus === 'PENDING') {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.LoadingSpinner, {
      size: SIZE,
      style: styles.container
    });
  }
  if (outgoingStatus === 'FAILED') {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'error',
      size: SIZE,
      color: colors.error,
      style: styles.container
    });
  }
  if (outgoingStatus === 'READ') {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'done-all',
      size: SIZE,
      color: colors.secondary,
      style: styles.container
    });
  }
  if (outgoingStatus === 'UNREAD' || outgoingStatus === 'DELIVERED') {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'done-all',
      size: SIZE,
      color: colors.onBackground03,
      style: styles.container
    });
  }
  if (outgoingStatus === 'UNDELIVERED') {
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'done',
      size: SIZE,
      color: colors.onBackground03,
      style: styles.container
    });
  }
  return null;
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    marginRight: 4
  }
});
var _default = /*#__PURE__*/_react.default.memo(MessageOutgoingStatus);
exports.default = _default;
//# sourceMappingURL=MessageOutgoingStatus.js.map