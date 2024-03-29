function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Pressable, View } from 'react-native';
import { createStyleSheet } from '@sendbird/uikit-react-native-foundation';
import { calcMessageGrouping, conditionChaining, isMyMessage, shouldRenderReaction, useIIFE } from '@sendbird/uikit-utils';
import { DEFAULT_LONG_PRESS_DELAY } from '../../constants';
import { useSendbirdChat } from '../../hooks/useContext';
import { ReactionAddons } from '../ReactionAddons';
import AdminMessage from './AdminMessage';
import FileMessage from './FileMessage';
import MessageContainer from './MessageContainer';
import MessageDateSeparator from './MessageDateSeparator';
import MessageIncomingAvatar from './MessageIncomingAvatar';
import MessageIncomingSenderName from './MessageIncomingSenderName';
import MessageOutgoingStatus from './MessageOutgoingStatus';
import MessageTime from './MessageTime';
import UnknownMessage from './UnknownMessage';
import UserMessage from './UserMessage';
const MessageRenderer = _ref => {
  let {
    currentUserId,
    channel,
    message,
    onPress,
    onLongPress,
    ...rest
  } = _ref;
  const variant = isMyMessage(message, currentUserId) ? 'outgoing' : 'incoming';
  const isOutgoing = variant === 'outgoing';
  const isIncoming = variant === 'incoming';
  const variantContainerStyle = {
    incoming: styles.chatIncoming,
    outgoing: styles.chatOutgoing
  }[variant];
  const {
    groupWithPrev,
    groupWithNext
  } = calcMessageGrouping(Boolean(rest.enableMessageGrouping), message, rest.prevMessage, rest.nextMessage);
  const {
    features
  } = useSendbirdChat();
  const reactionChildren = useIIFE(() => {
    if (shouldRenderReaction(channel, features.reactionEnabled) && message.reactions && message.reactions.length > 0) {
      return /*#__PURE__*/React.createElement(ReactionAddons.Message, {
        channel: channel,
        message: message
      });
    }
    return null;
  });
  const messageComponent = useIIFE(() => {
    const pressableProps = {
      style: styles.msgContainer,
      disabled: !onPress && !onLongPress,
      onPress,
      onLongPress,
      delayLongPress: DEFAULT_LONG_PRESS_DELAY
    };
    const messageProps = {
      ...rest,
      variant,
      groupWithNext,
      groupWithPrev
    };
    if (message.isUserMessage()) {
      return /*#__PURE__*/React.createElement(Pressable, pressableProps, _ref2 => {
        let {
          pressed
        } = _ref2;
        return /*#__PURE__*/React.createElement(UserMessage, _extends({
          message: message,
          pressed: pressed,
          onLongPressURL: onLongPress,
          onLongPressMentionedUser: onLongPress
        }, messageProps), reactionChildren);
      });
    }
    if (message.isFileMessage()) {
      return /*#__PURE__*/React.createElement(Pressable, pressableProps, _ref3 => {
        let {
          pressed
        } = _ref3;
        return /*#__PURE__*/React.createElement(FileMessage, _extends({
          message: message,
          pressed: pressed
        }, messageProps), reactionChildren);
      });
    }
    if (message.isAdminMessage()) {
      return /*#__PURE__*/React.createElement(AdminMessage, _extends({
        message: message,
        pressed: false
      }, messageProps));
    }
    return /*#__PURE__*/React.createElement(Pressable, pressableProps, _ref4 => {
      let {
        pressed
      } = _ref4;
      return /*#__PURE__*/React.createElement(UnknownMessage, _extends({
        message: message,
        pressed: pressed
      }, messageProps));
    });
  });
  return /*#__PURE__*/React.createElement(MessageContainer, null, /*#__PURE__*/React.createElement(MessageDateSeparator, {
    message: message,
    prevMessage: rest.prevMessage
  }), message.isAdminMessage() && messageComponent, !message.isAdminMessage() && /*#__PURE__*/React.createElement(View, {
    style: [variantContainerStyle, conditionChaining([groupWithNext, Boolean(rest.nextMessage)], [styles.chatGroup, styles.chatNonGroup, styles.chatLastMessage])]
  }, isOutgoing && /*#__PURE__*/React.createElement(View, {
    style: styles.outgoingContainer
  }, /*#__PURE__*/React.createElement(MessageOutgoingStatus, {
    channel: channel,
    message: message
  }), /*#__PURE__*/React.createElement(MessageTime, {
    message: message,
    grouping: groupWithNext,
    style: styles.timeOutgoing
  })), isIncoming && /*#__PURE__*/React.createElement(MessageIncomingAvatar, {
    message: message,
    grouping: groupWithNext
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.bubbleContainer
  }, isIncoming && /*#__PURE__*/React.createElement(MessageIncomingSenderName, {
    message: message,
    grouping: groupWithPrev
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.bubbleWrapper
  }, messageComponent, isIncoming && /*#__PURE__*/React.createElement(MessageTime, {
    message: message,
    grouping: groupWithNext,
    style: styles.timeIncoming
  })))));
};
const styles = createStyleSheet({
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
export default /*#__PURE__*/React.memo(MessageRenderer);
//# sourceMappingURL=index.js.map