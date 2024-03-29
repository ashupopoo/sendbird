"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AdminMessage = _ref => {
  let {
    message,
    nextMessage
  } = _ref;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const isNextAdmin = nextMessage === null || nextMessage === void 0 ? void 0 : nextMessage.isAdminMessage();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.flatten([styles.container, isNextAdmin ? styles.nextAdminType : styles.next])
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    caption2: true,
    color: colors.onBackground02,
    style: styles.text
  }, message.message));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center'
  },
  nextAdminType: {
    marginBottom: 8
  },
  next: {
    marginBottom: 16
  },
  text: {
    textAlign: 'center'
  }
});
var _default = AdminMessage;
exports.default = _default;
//# sourceMappingURL=index.js.map