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
const iconMapper = {
  audio: 'file-audio',
  image: 'photo',
  video: 'play',
  file: 'file-document'
};
const BaseFileMessage = _ref => {
  let {
    message,
    variant,
    pressed,
    type,
    children
  } = _ref;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const color = colors.ui.groupChannelMessage[variant][pressed ? 'pressed' : 'enabled'];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.bubbleContainer, {
      backgroundColor: color.background
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: iconMapper[type],
    size: 24,
    containerStyle: {
      backgroundColor: colors.background,
      padding: 2,
      borderRadius: 8,
      marginRight: 8
    }
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    body3: true,
    ellipsizeMode: 'middle',
    numberOfLines: 1,
    color: color.textMsg,
    style: styles.name
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_FILE_TITLE(message))), children);
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  bubbleContainer: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  name: {
    flexShrink: 1
  }
});
var _default = BaseFileMessage;
exports.default = _default;
//# sourceMappingURL=BaseFileMessage.js.map