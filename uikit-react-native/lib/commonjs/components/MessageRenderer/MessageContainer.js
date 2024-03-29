"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageContainer = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, children);
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 16
  }
});
var _default = MessageContainer;
exports.default = _default;
//# sourceMappingURL=MessageContainer.js.map