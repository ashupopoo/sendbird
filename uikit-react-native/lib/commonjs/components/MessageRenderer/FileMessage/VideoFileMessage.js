"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../../hooks/useContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useRetry = function (videoFileUrl) {
  let retryCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  const [state, setState] = (0, _react.useState)({
    thumbnail: null,
    loading: true
  });
  const retryCountRef = (0, _react.useRef)(0);
  const retryTimeoutRef = (0, _react.useRef)();
  const {
    mediaService
  } = (0, _useContext.usePlatformService)();
  const fetchThumbnail = () => {
    return mediaService.getVideoThumbnail({
      url: videoFileUrl,
      timeMills: 1000
    }).then(result => {
      setState({
        loading: false,
        thumbnail: (result === null || result === void 0 ? void 0 : result.path) ?? null
      });
    });
  };
  (0, _react.useEffect)(() => {
    if (!state.thumbnail) {
      const reloadReservation = () => {
        if (retryCountRef.current < retryCount) {
          retryTimeoutRef.current = setTimeout(() => {
            retryCountRef.current++;
            reloadReservation();
            fetchThumbnail();
          }, retryCountRef.current * 5000);
        }
      };
      return reloadReservation();
    } else {
      return clearTimeout(retryTimeoutRef.current);
    }
  }, [state.thumbnail]);
  return state;
};
const VideoFileMessage = _ref => {
  let {
    message,
    variant,
    children
  } = _ref;
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const fileUrl = (0, _uikitUtils.getAvailableUriFromFileMessage)(message);
  const style = [styles.video, {
    backgroundColor: colors.onBackground04
  }];
  const {
    loading,
    thumbnail
  } = useRetry(fileUrl);
  if (loading) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.bubbleContainer, {
        backgroundColor: colors.ui.groupChannelMessage[variant].enabled.background
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.bubbleContainer, styles.bubbleInnerContainer]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style
    }), /*#__PURE__*/_react.default.createElement(PlayIcon, null)), children);
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.bubbleContainer, {
      backgroundColor: colors.ui.groupChannelMessage[variant].enabled.background
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.bubbleContainer, styles.bubbleInnerContainer]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Image, {
    source: {
      uri: thumbnail || fileUrl
    },
    style: style,
    resizeMode: 'cover',
    resizeMethod: 'resize'
  }), /*#__PURE__*/_react.default.createElement(PlayIcon, null)), children);
};
const PlayIcon = () => {
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'play',
    size: 28,
    color: colors.onBackground02,
    containerStyle: [styles.playIcon, {
      backgroundColor: colors.onBackgroundReverse01
    }]
  });
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  bubbleContainer: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  bubbleInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  video: {
    width: 240,
    maxWidth: 240,
    height: 160
  },
  playIcon: {
    position: 'absolute',
    padding: 10,
    borderRadius: 50
  }
});
var _default = VideoFileMessage;
exports.default = _default;
//# sourceMappingURL=VideoFileMessage.js.map