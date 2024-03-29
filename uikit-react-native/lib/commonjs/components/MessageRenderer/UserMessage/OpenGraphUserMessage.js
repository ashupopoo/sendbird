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
var _SBUUtils = _interopRequireDefault(require("../../../libs/SBUUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const OpenGraphUserMessage = _ref => {
  var _ogMetaData$defaultIm;
  let {
    message,
    variant,
    pressed,
    ogMetaData,
    children,
    onLongPressMentionedUser,
    onLongPressURL
  } = _ref;
  const {
    mentionManager,
    currentUser
  } = (0, _useContext.useSendbirdChat)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    show
  } = (0, _useContext.useUserProfile)();
  const {
    colors,
    select,
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const [imageNotFound, setImageNotFound] = (0, _react.useState)(false);
  const color = colors.ui.groupChannelMessage[variant][pressed ? 'pressed' : 'enabled'];
  const containerBackground = select({
    dark: palette.background400,
    light: palette.background100
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.bubbleContainer, {
      backgroundColor: containerBackground
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, styles.bubbleContainer, {
      backgroundColor: color.background
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageContainer
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    body3: true,
    color: color.textMsg
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.RegexText, {
    body3: true,
    color: color.textMsg,
    patterns: [{
      regex: mentionManager.templateRegex,
      replacer(_ref2) {
        var _message$mentionedUse;
        let {
          match,
          groups,
          parentProps,
          keyPrefix,
          index
        } = _ref2;
        const user = (_message$mentionedUse = message.mentionedUsers) === null || _message$mentionedUse === void 0 ? void 0 : _message$mentionedUse.find(it => it.userId === groups[2]);
        if (user) {
          const isCurrentUser = user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId);
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, _extends({}, parentProps, {
            key: `${keyPrefix}-${index}`,
            onPress: () => show(user),
            onLongPress: onLongPressMentionedUser,
            style: [parentProps === null || parentProps === void 0 ? void 0 : parentProps.style, styles.mentionedText, isCurrentUser && {
              backgroundColor: palette.highlight
            }]
          }), `${mentionManager.asMentionedMessageText(user)}`);
        }
        return match;
      }
    }, {
      regex: _uikitUtils.urlRegexRough,
      replacer(_ref3) {
        let {
          match,
          parentProps,
          keyPrefix,
          index
        } = _ref3;
        return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, _extends({}, parentProps, {
          key: `${keyPrefix}-${index}`,
          onPress: () => _SBUUtils.default.openURL(match),
          onLongPress: onLongPressURL,
          style: [parentProps === null || parentProps === void 0 ? void 0 : parentProps.style, styles.urlText]
        }), match);
      }
    }]
  }, mentionManager.shouldUseMentionedMessageTemplate(message) ? message.mentionedMessageTemplate : message.message), Boolean(message.updatedAt) && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    body3: true,
    color: color.textEdited
  }, STRINGS.GROUP_CHANNEL.MESSAGE_BUBBLE_EDITED_POSTFIX))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: {
      backgroundColor: select({
        dark: palette.background500,
        light: palette.background200
      })
    },
    activeOpacity: 0.85,
    onPress: () => _SBUUtils.default.openURL(ogMetaData.url)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.ogImageContainer, {
      backgroundColor: select({
        dark: palette.background500,
        light: palette.background200
      })
    }]
  }, (0, _uikitUtils.conditionChaining)([imageNotFound], [/*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    containerStyle: styles.ogImage,
    icon: 'thumbnail-none',
    size: 48,
    color: colors.onBackground02
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Image, {
    source: {
      uri: (_ogMetaData$defaultIm = ogMetaData.defaultImage) === null || _ogMetaData$defaultIm === void 0 ? void 0 : _ogMetaData$defaultIm.url
    },
    style: styles.ogImage,
    resizeMode: 'cover',
    onError: () => setImageNotFound(true)
  })])), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.ogContainer, {
      backgroundColor: containerBackground
    }]
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    numberOfLines: 3,
    body2: true,
    color: colors.onBackground01,
    style: styles.ogTitle
  }, ogMetaData.title), Boolean(ogMetaData.description) && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    numberOfLines: 1,
    caption2: true,
    color: colors.onBackground01,
    style: styles.ogDesc
  }, ogMetaData.description), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    numberOfLines: 1,
    caption2: true,
    color: colors.onBackground02
  }, ogMetaData.url)))), children);
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  bubbleContainer: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  container: {
    width: 240,
    maxWidth: 240
  },
  messageContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  ogContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12
  },
  ogImageContainer: {
    flex: 1,
    height: 136
  },
  ogImage: {
    width: '100%',
    height: '100%'
  },
  ogTitle: {
    marginBottom: 4
  },
  ogDesc: {
    lineHeight: 14,
    marginBottom: 8
  },
  mentionedText: {
    fontWeight: 'bold'
  },
  urlText: {
    textDecorationLine: 'underline'
  }
});
var _default = OpenGraphUserMessage;
exports.default = _default;
//# sourceMappingURL=OpenGraphUserMessage.js.map