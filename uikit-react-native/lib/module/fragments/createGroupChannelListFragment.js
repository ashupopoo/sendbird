import React from 'react';
import { useGroupChannelList } from '@sendbird/uikit-chat-hooks';
import { PASS, useAppState, useFreshCallback } from '@sendbird/uikit-utils';
import StatusComposition from '../components/StatusComposition';
import GroupChannelPreviewContainer from '../containers/GroupChannelPreviewContainer';
import createGroupChannelListModule from '../domain/groupChannelList/module/createGroupChannelListModule';
import { useSendbirdChat } from '../hooks/useContext';
const createGroupChannelListFragment = initModule => {
  const GroupChannelListModule = createGroupChannelListModule(initModule);
  return _ref => {
    let {
      onPressChannel,
      onPressCreateChannel,
      queryCreator,
      collectionCreator,
      renderGroupChannelPreview,
      skipTypeSelection = false,
      flatListProps = {},
      menuItemCreator = PASS
    } = _ref;
    const {
      sdk,
      currentUser,
      features,
      markAsDeliveredWithChannel
    } = useSendbirdChat();
    const {
      groupChannels,
      next,
      loading
    } = useGroupChannelList(sdk, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId, {
      queryCreator,
      collectionCreator,
      enableCollectionWithoutLocalCache: !queryCreator
    });
    if (features.deliveryReceiptEnabled) {
      useAppState('change', status => {
        if (status === 'active') groupChannels.forEach(markAsDeliveredWithChannel);
      });
    }
    const _renderGroupChannelPreview = useFreshCallback((channel, onLongPressChannel) => {
      if (renderGroupChannelPreview) return renderGroupChannelPreview(channel, onLongPressChannel);
      return /*#__PURE__*/React.createElement(GroupChannelPreviewContainer, {
        channel: channel,
        onPress: () => onPressChannel(channel),
        onLongPress: () => onLongPressChannel()
      });
    });
    const isChannelTypeAvailable = features.broadcastChannelEnabled || features.superGroupChannelEnabled;
    return /*#__PURE__*/React.createElement(GroupChannelListModule.Provider, null, /*#__PURE__*/React.createElement(GroupChannelListModule.Header, null), /*#__PURE__*/React.createElement(StatusComposition, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/React.createElement(GroupChannelListModule.StatusLoading, null)
    }, /*#__PURE__*/React.createElement(GroupChannelListModule.List, {
      menuItemCreator: menuItemCreator,
      renderGroupChannelPreview: _renderGroupChannelPreview,
      groupChannels: groupChannels,
      onLoadNext: next,
      flatListProps: {
        ListEmptyComponent: /*#__PURE__*/React.createElement(GroupChannelListModule.StatusEmpty, null),
        contentContainerStyle: {
          flexGrow: 1
        },
        ...flatListProps
      }
    })), /*#__PURE__*/React.createElement(GroupChannelListModule.TypeSelector, {
      skipTypeSelection: isChannelTypeAvailable ? skipTypeSelection : true,
      onSelectType: onPressCreateChannel
    }));
  };
};
export default createGroupChannelListFragment;
//# sourceMappingURL=createGroupChannelListFragment.js.map