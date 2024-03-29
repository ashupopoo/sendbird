"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _icon = _interopRequireDefault(require("../../assets/icon"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Icon = _ref => {
  let {
    icon,
    color,
    size = 24,
    containerStyle,
    style
  } = _ref;
  const sizeStyle = sizeStyles[size] ?? {
    width: size,
    height: size
  };
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [containerStyle, containerStyles.container]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    resizeMode: 'contain',
    source: _icon.default[icon],
    style: [{
      tintColor: color ?? colors.primary
    }, sizeStyle, style]
  }));
};
const containerStyles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const sizeStyles = (0, _createStyleSheet.default)({
  16: {
    width: 16,
    height: 16
  },
  20: {
    width: 20,
    height: 20
  },
  24: {
    width: 24,
    height: 24
  },
  28: {
    width: 28,
    height: 28
  },
  32: {
    width: 32,
    height: 32
  }
});
Icon.Assets = _icon.default;
var _default = Icon;
exports.default = _default;
//# sourceMappingURL=index.js.map