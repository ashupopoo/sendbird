"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function convertCache(cache) {
  switch (cache) {
    case 'force-cache':
    case 'only-if-cached':
      return 'cacheOnly';
    default:
      return 'immutable';
  }
}
function convertSource(source) {
  if (Array.isArray(source)) {
    return convertSource(source[0]);
  }
  if (typeof source === 'number') {
    return source;
  }
  return {
    uri: source.uri,
    headers: source.headers,
    cache: convertCache(source.cache) //'immutable' | 'web' | 'cacheOnly'
  };
}

function convertDefaultSource(source) {
  if (typeof source === 'number') {
    return source;
  }
  return undefined;
}
function convertResizeMode(mode) {
  switch (mode) {
    case 'center':
      return 'center';
    case 'contain':
      return 'contain';
    case 'cover':
      return 'cover';
    case 'stretch':
      return 'stretch';
    default:
      return undefined;
  }
}
let FastImage = () => null;
try {
  FastImage = require('react-native-fast-image');
} catch {}
const Image_FastImage = _ref => {
  let {
    source,
    defaultSource,
    resizeMode,
    onLoad,
    onError,
    style,
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(FastImage, _extends({}, props, {
    onLoad: onLoad && (e => onLoad(e.nativeEvent)),
    onError: onError && (() => onError({})),
    style: style,
    source: convertSource(source),
    defaultSource: convertDefaultSource(defaultSource),
    resizeMode: convertResizeMode(resizeMode)
  }));
};
var _default = Image_FastImage;
exports.default = _default;
//# sourceMappingURL=Image.fastimage.js.map