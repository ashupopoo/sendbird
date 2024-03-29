"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _constants = require("../../constants");
var _useContext = require("../../hooks/useContext");
var _ReactionAddons = require("../ReactionAddons");
var _AdminMessage = _interopRequireDefault(require("./AdminMessage"));
var _FileMessage = _interopRequireDefault(require("./FileMessage"));
var _MessageContainer = _interopRequireDefault(require("./MessageContainer"));
var _MessageDateSeparator = _interopRequireDefault(require("./MessageDateSeparator"));
var _MessageIncomingAvatar = _interopRequireDefault(require("./MessageIncomingAvatar"));
var _MessageIncomingSenderName = _interopRequireDefault(require("./MessageIncomingSenderName"));
var _MessageOutgoingStatus = _interopRequireDefault(require("./MessageOutgoingStatus"));
var _MessageTime = _interopRequireDefault(require("./MessageTime"));
var _UnknownMessage = _interopRequireDefault(require("./UnknownMessage"));
var _UserMessage = _interopRequireDefault(require("./UserMessage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const MessageRenderer = _ref => {
  let {
    currentUserId,
    channel,
    message,
    onPress,
    onLongPress,
    ...rest
  } = _ref;
  const variant = (0, _uikitUtils.isMyMessage)(message, currentUserId) ? 'outgoing' : 'incoming';
  const isOutgoing = variant === 'outgoing';
  const isIncoming = variant === 'incoming';
  const variantContainerStyle = {
    incoming: styles.chatIncoming,
    outgoing: styles.chatOutgoing
  }[variant];
  const {
    groupWithPrev,
    groupWithNext
  } = (0, _uikitUtils.calcMessageGrouping)(Boolean(rest.enableMessageGrouping), message, rest.prevMessage, rest.nextMessage);
  const {
    features
  } = (0, _useContext.useSendbirdChat)();
  const reactionChildren = (0, _uikitUtils.useIIFE)(() => {
    if ((0, _uikitUtils.shouldRenderReaction)(channel, features.reactionEnabled) && message.reactions && message.reactions.length > 0) {
      return /*#__PURE__*/_react.default.createElement(_ReactionAddons.ReactionAddons.Message, {
        channel: channel,
        message: message
      });
    }
    return null;
  });
  const messageComponent = (0, _uikitUtils.useIIFE)(() => {
    const pressableProps = {
      style: styles.msgContainer,
      disabled: !onPress && !onLongPress,
      onPress,
      onLongPress,
      delayLongPress: _constants.DEFAULT_LONG_PRESS_DELAY
    };
    const messageProps = {
      ...rest,
      variant,
      groupWithNext,
      groupWithPrev
    };
    if (message.isUserMessage()) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, pressableProps, _ref2 => {
        let {
          pressed
        } = _ref2;
        return /*#__PURE__*/_react.default.createElement(_UserMessage.default, _extends({
          message: message,
          pressed: pressed,
          onLongPressURL: onLongPress,
          onLongPressMentionedUser: onLongPress
        }, messageProps), reactionChildren);
      });
    }
    if (message.isFileMessage()) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, pressableProps, _ref3 => {
        let {
          pressed
        } = _ref3;
        return /*#__PURE__*/_react.default.createElement(_FileMessage.default, _extends({
          message: message,
          pressed: pressed
        }, messageProps), reactionChildren);
      });
    }
    if (message.isAdminMessage()) {
      return /*#__PURE__*/_react.default.createElement(_AdminMessage.default, _extends({
        message: message,
        pressed: false
      }, messageProps));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, pressableProps, _ref4 => {
      let {
        pressed
      } = _ref4;
      return /*#__PURE__*/_react.default.createElement(_UnknownMessage.default, _extends({
        message: message,
        pressed: pressed
      }, messageProps));
    });
  });
  return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, null, /*#__PURE__*/_react.default.createElement(_MessageDateSeparator.default, {
    message: message,
    prevMessage: rest.prevMessage
  }), message.isAdminMessage() && messageComponent, !message.isAdminMessage() && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [variantContainerStyle, (0, _uikitUtils.conditionChaining)([groupWithNext, Boolean(rest.nextMessage)], [styles.chatGroup, styles.chatNonGroup, styles.chatLastMessage])]
  }, isOutgoing && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.outgoingContainer
  }, /*#__PURE__*/_react.default.createElement(_MessageOutgoingStatus.default, {
    channel: channel,
    message: message
  }), /*#__PURE__*/_react.default.createElement(_MessageTime.default, {
    message: message,
    grouping: groupWithNext,
    style: styles.timeOutgoing
  })), isIncoming && /*#__PURE__*/_react.default.createElement(_MessageIncomingAvatar.default, {
    message: message,
    grouping: groupWithNext
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.bubbleContainer
  }, isIncoming && /*#__PURE__*/_react.default.createElement(_MessageIncomingSenderName.default, {
    message: message,
    grouping: groupWithPrev
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.bubbleWrapper
  }, messageComponent, isIncoming && /*#__PURE__*/_react.default.createElement(_MessageTime.default, {
    message: message,
    grouping: groupWithNext,
    style: styles.timeIncoming
  })))));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  chatIncoming: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  chatOutgoing: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  timeIncoming: {
    marginLeft: 4
  },
  timeOutgoing: {
    marginRight: 4
  },
  chatGroup: {
    marginBottom: 2
  },
  chatNonGroup: {
    marginBottom: 16
  },
  chatLastMessage: {
    marginBottom: 16
  },
  msgContainer: {
    maxWidth: 240
  },
  bubbleContainer: {
    flexShrink: 1
  },
  bubbleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  outgoingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});
var _default = /*#__PURE__*/_react.default.memo(MessageRenderer);
exports.default = _default;
//# sourceMappingURL=index.js.map