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
const MessageTime = _ref => {
  let {
    message,
    grouping,
    style
  } = _ref;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  if (grouping) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    caption4: true,
    color: colors.ui.groupChannelMessage.incoming.enabled.textTime
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_TIME(message)));
};
var _default = MessageTime;
exports.default = _default;
//# sourceMappingURL=MessageTime.js.map