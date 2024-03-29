"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _Text = _interopRequireDefault(require("../Text"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const openUrl = (url, httpProtocol) => {
  const targetUrl = httpProtocol ? url : 'https://' + url;
  _reactNative.Linking.openURL(targetUrl).catch(err => _uikitUtils.Logger.warn('[URLParsedText]', 'Cannot open url', err));
};
const URLParsedText = _ref => {
  let {
    children,
    onPressUrl = openUrl,
    strict,
    ...props
  } = _ref;
  const parsedChildren = _react.default.Children.map(_react.default.Children.toArray(children), child => {
    if (typeof child === 'string') {
      return (0, _uikitUtils.replaceUrlAsComponents)(child, url => {
        return /*#__PURE__*/_react.default.createElement(_Text.default, _extends({}, props, {
          suppressHighlighting: true,
          onPress: () => onPressUrl === null || onPressUrl === void 0 ? void 0 : onPressUrl(url, url.startsWith('http')),
          style: [props.style, styles.url]
        }), url);
      }, strict);
    }
    return child;
  });
  return /*#__PURE__*/_react.default.createElement(_Text.default, props, parsedChildren);
};
const styles = (0, _createStyleSheet.default)({
  url: {
    textDecorationLine: 'underline'
  }
});
var _default = URLParsedText;
exports.default = _default;
//# sourceMappingURL=index.js.map