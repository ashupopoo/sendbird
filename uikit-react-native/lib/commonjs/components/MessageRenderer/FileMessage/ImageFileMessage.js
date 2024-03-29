"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useRetry = function (hasError) {
  let retryCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  if (_reactNative.Platform.OS === 'android') return '';
  const forceUpdate = (0, _uikitUtils.useForceUpdate)();
  const retryCountRef = (0, _react.useRef)(1);
  const retryTimeoutRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    if (hasError) {
      const reloadReservation = () => {
        if (retryCountRef.current < retryCount) {
          retryTimeoutRef.current = setTimeout(() => {
            retryCountRef.current++;
            reloadReservation();
            forceUpdate();
          }, retryCountRef.current * 5000);
        }
      };
      return reloadReservation();
    } else {
      return clearTimeout(retryTimeoutRef.current);
    }
  }, [hasError]);
  return retryCountRef.current;
};
const ImageFileMessage = _ref => {
  let {
    message,
    children,
    variant
  } = _ref;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const [imageNotFound, setImageNotFound] = (0, _react.useState)(false);
  const fileUrl = (0, _uikitUtils.getAvailableUriFromFileMessage)(message);
  const style = [styles.image, {
    backgroundColor: colors.onBackground04
  }];
  const key = useRetry(imageNotFound);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.bubbleContainer, {
      backgroundColor: imageNotFound ? colors.onBackground04 : colors.ui.groupChannelMessage[variant].enabled.background
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Image, {
    key: key,
    source: {
      uri: fileUrl
    },
    style: [_reactNative.StyleSheet.absoluteFill, imageNotFound && styles.hide],
    resizeMode: 'cover',
    resizeMethod: 'resize',
    onError: () => setImageNotFound(true),
    onLoad: () => setImageNotFound(false)
  }), imageNotFound && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    containerStyle: _reactNative.StyleSheet.absoluteFill,
    icon: 'thumbnail-none',
    size: 48,
    color: colors.onBackground02
  })), children);
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  bubbleContainer: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  image: {
    width: 240,
    maxWidth: 240,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden'
  },
  hide: {
    display: 'none'
  }
});
var _default = ImageFileMessage;
exports.default = _default;
//# sourceMappingURL=ImageFileMessage.js.map