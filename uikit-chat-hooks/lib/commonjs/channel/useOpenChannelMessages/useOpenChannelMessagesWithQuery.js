"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOpenChannelMessagesWithQuery = void 0;
var _react = require("react");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useChannelHandler = require("../../handler/useChannelHandler");
var _useConnectionHandler = require("../../handler/useConnectionHandler");
var _useChannelMessagesReducer = require("../useChannelMessagesReducer");
const createMessageQuery = (channel, creator) => {
  if (creator) return creator();
  return channel.createPreviousMessageListQuery({
    limit: 100,
    reverse: true
  });
};
const useOpenChannelMessagesWithQuery = (sdk, channel, userId, options) => {
  const queryRef = (0, _react.useRef)();
  const forceUpdate = (0, _uikitUtils.useForceUpdate)();
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('useOpenChannelMessagesWithQuery');
  const {
    loading,
    refreshing,
    messages,
    newMessages,
    updateMessages,
    updateNewMessages,
    deleteNewMessages,
    deleteMessages,
    updateLoading,
    updateRefreshing
  } = (0, _useChannelMessagesReducer.useChannelMessagesReducer)(options === null || options === void 0 ? void 0 : options.sortComparator);
  const init = (0, _uikitUtils.useFreshCallback)(async uid => {
    if (uid) {
      var _queryRef$current;
      queryRef.current = createMessageQuery(channel, options === null || options === void 0 ? void 0 : options.queryCreator);
      if ((_queryRef$current = queryRef.current) !== null && _queryRef$current !== void 0 && _queryRef$current.hasNext) {
        var _queryRef$current2;
        const list = await ((_queryRef$current2 = queryRef.current) === null || _queryRef$current2 === void 0 ? void 0 : _queryRef$current2.load());
        updateMessages(list, true, sdk.currentUser.userId);
      }
      updateNewMessages([], true, sdk.currentUser.userId);
    }
  });
  const channelUpdater = channel => {
    if (channel.isOpenChannel() && !(0, _uikitUtils.isDifferentChannel)(channel, channel)) {
      forceUpdate();
    }
  };
  (0, _useConnectionHandler.useConnectionHandler)(sdk, handlerId, {
    async onReconnectSucceeded() {
      var _queryRef$current3, _queryRef$current4, _queryRef$current5, _queryRef$current6, _queryRef$current7, _queryRef$current8, _queryRef$current9, _queryRef$current10, _queryRef$current11, _queryRef$current12, _queryRef$current13, _queryRef$current14, _queryRef$current15, _queryRef$current16, _queryRef$current17, _queryRef$current18;
      const lastMessage = messages[0];
      if (!lastMessage) return;
      const messageContext = {
        updatedMessages: [],
        addedMessages: [],
        deletedMessageIds: []
      };
      const changeLogsContext = {
        hasMore: false,
        token: ''
      };
      const messageQueryContext = {
        hasMore: false,
        timestamp: lastMessage.createdAt
      };

      // Updated & Deleted messages
      const changelogsParams = {
        replyType: (_queryRef$current3 = queryRef.current) === null || _queryRef$current3 === void 0 ? void 0 : _queryRef$current3.replyType,
        includeMetaArray: (_queryRef$current4 = queryRef.current) === null || _queryRef$current4 === void 0 ? void 0 : _queryRef$current4.includeMetaArray,
        includeReactions: (_queryRef$current5 = queryRef.current) === null || _queryRef$current5 === void 0 ? void 0 : _queryRef$current5.includeReactions,
        includeThreadInfo: (_queryRef$current6 = queryRef.current) === null || _queryRef$current6 === void 0 ? void 0 : _queryRef$current6.includeThreadInfo,
        includeParentMessageInfo: (_queryRef$current7 = queryRef.current) === null || _queryRef$current7 === void 0 ? void 0 : _queryRef$current7.includeParentMessageInfo
      };
      const changeLogsByTS = await channel.getMessageChangeLogsSinceTimestamp(lastMessage.createdAt);
      changeLogsContext.token = changeLogsByTS.token;
      changeLogsContext.hasMore = changeLogsByTS.hasMore;
      messageContext.updatedMessages.push(...changeLogsByTS.updatedMessages);
      messageContext.deletedMessageIds.push(...changeLogsByTS.deletedMessageIds);
      while (changeLogsContext.hasMore) {
        const changeLogsByToken = await channel.getMessageChangeLogsSinceToken(changeLogsByTS.token, changelogsParams);
        changeLogsContext.token = changeLogsByToken.token;
        changeLogsContext.hasMore = changeLogsByToken.hasMore;
        messageContext.updatedMessages.push(...changeLogsByToken.updatedMessages);
        messageContext.deletedMessageIds.push(...changeLogsByToken.deletedMessageIds);
      }

      // Added messages
      const messageQueryParams = {
        prevResultSize: 0,
        nextResultSize: ((_queryRef$current8 = queryRef.current) === null || _queryRef$current8 === void 0 ? void 0 : _queryRef$current8.limit) ?? 100,
        reverse: (_queryRef$current9 = queryRef.current) === null || _queryRef$current9 === void 0 ? void 0 : _queryRef$current9.reverse,
        includeParentMessageInfo: (_queryRef$current10 = queryRef.current) === null || _queryRef$current10 === void 0 ? void 0 : _queryRef$current10.includeParentMessageInfo,
        includeThreadInfo: (_queryRef$current11 = queryRef.current) === null || _queryRef$current11 === void 0 ? void 0 : _queryRef$current11.includeThreadInfo,
        includeReactions: (_queryRef$current12 = queryRef.current) === null || _queryRef$current12 === void 0 ? void 0 : _queryRef$current12.includeReactions,
        includeMetaArray: (_queryRef$current13 = queryRef.current) === null || _queryRef$current13 === void 0 ? void 0 : _queryRef$current13.includeMetaArray,
        replyType: (_queryRef$current14 = queryRef.current) === null || _queryRef$current14 === void 0 ? void 0 : _queryRef$current14.replyType,
        customTypesFilter: (_queryRef$current15 = queryRef.current) === null || _queryRef$current15 === void 0 ? void 0 : _queryRef$current15.customTypesFilter,
        messageTypeFilter: (_queryRef$current16 = queryRef.current) === null || _queryRef$current16 === void 0 ? void 0 : _queryRef$current16.messageTypeFilter,
        senderUserIdsFilter: (_queryRef$current17 = queryRef.current) === null || _queryRef$current17 === void 0 ? void 0 : _queryRef$current17.senderUserIdsFilter,
        showSubchannelMessagesOnly: (_queryRef$current18 = queryRef.current) === null || _queryRef$current18 === void 0 ? void 0 : _queryRef$current18.showSubchannelMessagesOnly
      };
      const queriedMessages = await channel.getMessagesByTimestamp(lastMessage.createdAt, messageQueryParams);
      messageQueryContext.hasMore = queriedMessages.length > 0;
      if (messageQueryContext.hasMore) {
        messageQueryContext.timestamp = queriedMessages[0].createdAt;
        messageContext.addedMessages.unshift(...queriedMessages);
      }
      while (messageQueryContext.hasMore) {
        const queriedMessages = await channel.getMessagesByTimestamp(messageQueryContext.timestamp, messageQueryParams);
        messageQueryContext.hasMore = queriedMessages.length > 0;
        if (messageQueryContext.hasMore) {
          messageQueryContext.timestamp = queriedMessages[0].createdAt;
          messageContext.addedMessages.unshift(...queriedMessages);
        }
      }

      // Update to View
      updateMessages([...messageContext.addedMessages, ...messageContext.updatedMessages], false, sdk.currentUser.userId);
      deleteMessages(messageContext.deletedMessageIds, []);
      if (messageContext.addedMessages.length > 0) {
        var _options$shouldCountN;
        if (options !== null && options !== void 0 && (_options$shouldCountN = options.shouldCountNewMessages) !== null && _options$shouldCountN !== void 0 && _options$shouldCountN.call(options)) {
          updateNewMessages(messageContext.addedMessages, false, sdk.currentUser.userId);
        }
        if (options !== null && options !== void 0 && options.onMessagesReceived) {
          options.onMessagesReceived(messageContext.addedMessages);
        }
      }
    }
  });
  (0, _useChannelHandler.useChannelHandler)(sdk, handlerId, {
    // Messages
    onMessageReceived(eventChannel, message) {
      var _options$shouldCountN2;
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      if ((0, _uikitUtils.isMyMessage)(message, sdk.currentUser.userId)) return;
      updateMessages([message], false, sdk.currentUser.userId);
      if (options !== null && options !== void 0 && (_options$shouldCountN2 = options.shouldCountNewMessages) !== null && _options$shouldCountN2 !== void 0 && _options$shouldCountN2.call(options)) {
        updateNewMessages([message], false, sdk.currentUser.userId);
      }
      if (options !== null && options !== void 0 && options.onMessagesReceived) {
        options.onMessagesReceived([message]);
      }
    },
    onMessageUpdated(eventChannel, message) {
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      if ((0, _uikitUtils.isMyMessage)(message, sdk.currentUser.userId)) return;
      updateMessages([message], false, sdk.currentUser.userId);
    },
    onMessageDeleted(eventChannel, messageId) {
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      deleteMessages([messageId], []);
      deleteNewMessages([messageId], []);
    },
    // Channels
    onChannelChanged: channelUpdater,
    onChannelFrozen: channelUpdater,
    onChannelUnfrozen: channelUpdater,
    onChannelParticipantCountChanged(eventChannel) {
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      channelUpdater(eventChannel);
    },
    onChannelDeleted(channelUrl, type) {
      if (channel.url === channelUrl && type === 'open') {
        var _options$onChannelDel;
        options === null || options === void 0 ? void 0 : (_options$onChannelDel = options.onChannelDeleted) === null || _options$onChannelDel === void 0 ? void 0 : _options$onChannelDel.call(options);
      }
    },
    // Users
    onOperatorUpdated: channelUpdater,
    onUserUnbanned: channelUpdater,
    onUserMuted: channelUpdater,
    onUserUnmuted: channelUpdater,
    onUserBanned(eventChannel, bannedUser) {
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      if (bannedUser.userId === sdk.currentUser.userId) {
        var _options$onChannelDel2;
        options === null || options === void 0 ? void 0 : (_options$onChannelDel2 = options.onChannelDeleted) === null || _options$onChannelDel2 === void 0 ? void 0 : _options$onChannelDel2.call(options);
      } else {
        channelUpdater(eventChannel);
      }
    }
  }, 'open');
  (0, _uikitUtils.useAsyncEffect)(async () => {
    updateLoading(true);
    try {
      await channel.enter();
      await init(userId);
    } catch (error) {
      var _options$onError, _options$onChannelDel3;
      options === null || options === void 0 ? void 0 : (_options$onError = options.onError) === null || _options$onError === void 0 ? void 0 : _options$onError.call(options, error);
      options === null || options === void 0 ? void 0 : (_options$onChannelDel3 = options.onChannelDeleted) === null || _options$onChannelDel3 === void 0 ? void 0 : _options$onChannelDel3.call(options);
    } finally {
      updateLoading(false);
    }
    return () => {
      channel.exit().catch(_uikitUtils.NOOP);
    };
  }, [channel.url, userId]);
  const refresh = (0, _uikitUtils.useFreshCallback)(async () => {
    updateRefreshing(true);
    await init(userId);
    updateRefreshing(false);
  });
  const prev = (0, _uikitUtils.useFreshCallback)(async () => {
    var _queryRef$current19;
    if (queryRef.current && (_queryRef$current19 = queryRef.current) !== null && _queryRef$current19 !== void 0 && _queryRef$current19.hasNext) {
      var _queryRef$current20;
      const list = await ((_queryRef$current20 = queryRef.current) === null || _queryRef$current20 === void 0 ? void 0 : _queryRef$current20.load());
      updateMessages(list, false, sdk.currentUser.userId);
    }
  });
  const hasPrev = (0, _uikitUtils.useFreshCallback)(() => {
    var _queryRef$current21;
    return ((_queryRef$current21 = queryRef.current) === null || _queryRef$current21 === void 0 ? void 0 : _queryRef$current21.hasNext) ?? false;
  });
  const next = (0, _uikitUtils.useFreshCallback)(_uikitUtils.ASYNC_NOOP);
  const hasNext = (0, _uikitUtils.useFreshCallback)(() => false);
  const sendUserMessage = (0, _uikitUtils.useFreshCallback)((params, onPending) => {
    return new Promise((resolve, reject) => {
      channel.sendUserMessage(params).onPending(pendingMessage => {
        if (pendingMessage.isUserMessage()) {
          updateMessages([pendingMessage], false, sdk.currentUser.userId);
          onPending === null || onPending === void 0 ? void 0 : onPending(pendingMessage);
        }
      }).onSucceeded(sentMessage => {
        if (sentMessage.isUserMessage()) {
          updateMessages([sentMessage], false, sdk.currentUser.userId);
          resolve(sentMessage);
        }
      }).onFailed((err, sentMessage) => {
        updateMessages([sentMessage], false, sdk.currentUser.userId);
        reject(err);
      });
    });
  });
  const sendFileMessage = (0, _uikitUtils.useFreshCallback)((params, onPending) => {
    return new Promise((resolve, reject) => {
      channel.sendFileMessage(params).onPending(pendingMessage => {
        if (pendingMessage.isFileMessage()) {
          updateMessages([pendingMessage], false, sdk.currentUser.userId);
          onPending === null || onPending === void 0 ? void 0 : onPending(pendingMessage);
        }
      }).onSucceeded(sentMessage => {
        if (sentMessage.isFileMessage()) {
          updateMessages([sentMessage], false, sdk.currentUser.userId);
          resolve(sentMessage);
        }
      }).onFailed((err, sentMessage) => {
        updateMessages([sentMessage], false, sdk.currentUser.userId);
        reject(err);
      });
    });
  });
  const updateUserMessage = (0, _uikitUtils.useFreshCallback)(async (messageId, params) => {
    const updatedMessage = await channel.updateUserMessage(messageId, params);
    updateMessages([updatedMessage], false, sdk.currentUser.userId);
    return updatedMessage;
  });
  const updateFileMessage = (0, _uikitUtils.useFreshCallback)(async (messageId, params) => {
    const updatedMessage = await channel.updateFileMessage(messageId, params);
    updateMessages([updatedMessage], false, sdk.currentUser.userId);
    return updatedMessage;
  });
  const resendMessage = (0, _uikitUtils.useFreshCallback)(async failedMessage => {
    const message = await (() => {
      if (failedMessage.isUserMessage()) return channel.resendUserMessage(failedMessage);
      if (failedMessage.isFileMessage()) return channel.resendFileMessage(failedMessage);
      return null;
    })();
    if (message) updateMessages([message], false, sdk.currentUser.userId);
  });
  const deleteMessage = (0, _uikitUtils.useFreshCallback)(async message => {
    if (message.sendingStatus === 'succeeded') {
      if (message.isUserMessage()) await channel.deleteMessage(message);
      if (message.isFileMessage()) await channel.deleteMessage(message);
    } else {
      deleteMessages([message.messageId], [message.reqId]);
    }
  });
  const resetNewMessages = (0, _uikitUtils.useFreshCallback)(() => {
    updateNewMessages([], true, sdk.currentUser.userId);
  });
  return {
    loading,
    refreshing,
    refresh,
    messages,
    newMessages,
    next,
    hasNext,
    prev,
    hasPrev,
    sendUserMessage,
    sendFileMessage,
    updateUserMessage,
    updateFileMessage,
    resendMessage,
    deleteMessage,
    resetNewMessages,
    nextMessages: newMessages,
    newMessagesFromMembers: newMessages
  };
};
exports.useOpenChannelMessagesWithQuery = useOpenChannelMessagesWithQuery;
//# sourceMappingURL=useOpenChannelMessagesWithQuery.js.map