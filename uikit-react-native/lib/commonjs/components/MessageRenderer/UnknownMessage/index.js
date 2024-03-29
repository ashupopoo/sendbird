"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../../../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UnknownMessage = _ref => {
  let {
    message,
    variant,
    pressed
  } = _ref;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const color = colors.ui.groupChannelMessage[variant][pressed ? 'pressed' : 'enabled'];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: color.background
    }]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    body3: true,
    color: colors.onBackground01
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_UNKNOWN_TITLE(message)), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    body3: true,
    color: colors.onBackground02
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_UNKNOWN_DESC(message)));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  }
});
var _default = UnknownMessage;
exports.default = _default;
//# sourceMappingURL=index.js.map