"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const TextInput = /*#__PURE__*/_react.default.forwardRef(function TextInput(_ref, ref) {
  let {
    children,
    style,
    variant = 'default',
    editable = true,
    ...props
  } = _ref;
  const {
    typography,
    colors
  } = (0, _useUIKitTheme.default)();
  const variantStyle = colors['ui']['input'][variant];
  const inputStyle = editable ? variantStyle.active : variantStyle.disabled;
  const underlineStyle = variant === 'underline' && {
    borderBottomWidth: 2,
    borderBottomColor: inputStyle.highlight
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({
    ref: ref,
    editable: editable,
    selectionColor: inputStyle.highlight,
    placeholderTextColor: inputStyle.placeholder,
    style: [typography.body3, styles.input, {
      color: inputStyle.text,
      backgroundColor: inputStyle.background
    }, underlineStyle, style]
  }, props), children);
});
const styles = (0, _createStyleSheet.default)({
  input: {
    paddingVertical: 8,
    paddingHorizontal: 16
  }
});
var _default = TextInput;
exports.default = _default;
//# sourceMappingURL=index.js.map