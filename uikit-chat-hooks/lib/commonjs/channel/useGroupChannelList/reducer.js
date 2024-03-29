"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroupChannelListReducer = void 0;
var _react = require("react");
var _uikitUtils = require("@sendbird/uikit-utils");
const defaultReducer = (_ref, action) => {
  let {
    ...draft
  } = _ref;
  const compareByOrder = createCompareByOrder(draft.order);
  switch (action.type) {
    case 'update_refreshing':
      {
        draft.refreshing = action.value.status;
        break;
      }
    case 'update_loading':
      {
        draft.loading = action.value.status;
        break;
      }
    case 'update_channels':
      {
        (0, _uikitUtils.getGroupChannels)(action.value.channels).forEach(freshChannel => {
          const idx = draft.groupChannels.findIndex(staleChannel => staleChannel.url === freshChannel.url);
          if (idx > -1) draft.groupChannels[idx] = freshChannel;
        });
        compareByOrder && (draft.groupChannels = draft.groupChannels.sort(compareByOrder));
        break;
      }
    case 'delete_channels':
      {
        action.value.channelUrls.forEach(url => {
          const idx = draft.groupChannels.findIndex(c => c.url === url);
          if (idx > -1) draft.groupChannels.splice(idx, 1);
        });
        compareByOrder && (draft.groupChannels = draft.groupChannels.sort(compareByOrder));
        break;
      }
    case 'set_channels':
      {
        if (action.value.clearBeforeAction) {
          draft.groupChannels = (0, _uikitUtils.getGroupChannels)(action.value.channels);
        } else {
          draft.groupChannels = [...draft.groupChannels, ...(0, _uikitUtils.getGroupChannels)(action.value.channels)];
        }
        compareByOrder && (draft.groupChannels = draft.groupChannels.sort(compareByOrder));
        break;
      }
    case 'update_order':
      {
        draft.order = action.value.order;
        const compareByOrder = createCompareByOrder(draft.order);
        compareByOrder && (draft.groupChannels = draft.groupChannels.sort(compareByOrder));
        break;
      }
  }
  return draft;
};
const useGroupChannelListReducer = order => {
  const [{
    loading,
    refreshing,
    groupChannels
  }, dispatch] = (0, _react.useReducer)(defaultReducer, {
    loading: true,
    refreshing: false,
    groupChannels: [],
    order
  });
  const updateChannels = channels => {
    dispatch({
      type: 'update_channels',
      value: {
        channels
      }
    });
  };
  const deleteChannels = channelUrls => {
    dispatch({
      type: 'delete_channels',
      value: {
        channelUrls
      }
    });
  };
  const setChannels = (channels, clearBeforeAction) => {
    dispatch({
      type: 'set_channels',
      value: {
        channels,
        clearBeforeAction
      }
    });
  };
  const updateLoading = status => {
    dispatch({
      type: 'update_loading',
      value: {
        status
      }
    });
  };
  const updateRefreshing = status => {
    dispatch({
      type: 'update_refreshing',
      value: {
        status
      }
    });
  };
  const updateOrder = order => {
    dispatch({
      type: 'update_order',
      value: {
        order
      }
    });
  };
  return {
    updateLoading,
    updateRefreshing,
    updateChannels,
    deleteChannels,
    setChannels,
    updateOrder,
    loading,
    refreshing,
    groupChannels
  };
};
exports.useGroupChannelListReducer = useGroupChannelListReducer;
const createCompareByOrder = order => {
  if (!order) return undefined;
  return (channel1, channel2) => {
    switch (order) {
      case 'latest_last_message':
        {
          if (channel1.lastMessage && channel2.lastMessage) {
            return channel2.lastMessage.createdAt - channel1.lastMessage.createdAt;
          } else if (channel1.lastMessage) {
            return -1;
          } else if (channel2.lastMessage) {
            return 1;
          } else {
            return channel2.createdAt - channel1.createdAt;
          }
        }
      case 'chronological':
        {
          return channel2.createdAt - channel1.createdAt;
        }
      case 'channel_name_alphabetical':
        {
          return channel1.name.localeCompare(channel2.name);
        }
      default:
        {
          return 0;
        }
    }
  };
};
//# sourceMappingURL=reducer.js.map