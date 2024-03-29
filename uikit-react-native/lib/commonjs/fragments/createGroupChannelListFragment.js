"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitUtils = require("@sendbird/uikit-utils");
var _StatusComposition = _interopRequireDefault(require("../components/StatusComposition"));
var _GroupChannelPreviewContainer = _interopRequireDefault(require("../containers/GroupChannelPreviewContainer"));
var _createGroupChannelListModule = _interopRequireDefault(require("../domain/groupChannelList/module/createGroupChannelListModule"));
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelListFragment = initModule => {
  const GroupChannelListModule = (0, _createGroupChannelListModule.default)(initModule);
  return _ref => {
    let {
      onPressChannel,
      onPressCreateChannel,
      queryCreator,
      collectionCreator,
      renderGroupChannelPreview,
      skipTypeSelection = false,
      flatListProps = {},
      menuItemCreator = _uikitUtils.PASS
    } = _ref;
    const {
      sdk,
      currentUser,
      features,
      markAsDeliveredWithChannel
    } = (0, _useContext.useSendbirdChat)();
    const {
      groupChannels,
      next,
      loading
    } = (0, _uikitChatHooks.useGroupChannelList)(sdk, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId, {
      queryCreator,
      collectionCreator,
      enableCollectionWithoutLocalCache: !queryCreator
    });
    if (features.deliveryReceiptEnabled) {
      (0, _uikitUtils.useAppState)('change', status => {
        if (status === 'active') groupChannels.forEach(markAsDeliveredWithChannel);
      });
    }
    const _renderGroupChannelPreview = (0, _uikitUtils.useFreshCallback)((channel, onLongPressChannel) => {
      if (renderGroupChannelPreview) return renderGroupChannelPreview(channel, onLongPressChannel);
      return /*#__PURE__*/_react.default.createElement(_GroupChannelPreviewContainer.default, {
        channel: channel,
        onPress: () => onPressChannel(channel),
        onLongPress: () => onLongPressChannel()
      });
    });
    const isChannelTypeAvailable = features.broadcastChannelEnabled || features.superGroupChannelEnabled;
    return /*#__PURE__*/_react.default.createElement(GroupChannelListModule.Provider, null, /*#__PURE__*/_react.default.createElement(GroupChannelListModule.Header, null), /*#__PURE__*/_react.default.createElement(_StatusComposition.default, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/_react.default.createElement(GroupChannelListModule.StatusLoading, null)
    }, /*#__PURE__*/_react.default.createElement(GroupChannelListModule.List, {
      menuItemCreator: menuItemCreator,
      renderGroupChannelPreview: _renderGroupChannelPreview,
      groupChannels: groupChannels,
      onLoadNext: next,
      flatListProps: {
        ListEmptyComponent: /*#__PURE__*/_react.default.createElement(GroupChannelListModule.StatusEmpty, null),
        contentContainerStyle: {
          flexGrow: 1
        },
        ...flatListProps
      }
    })), /*#__PURE__*/_react.default.createElement(GroupChannelListModule.TypeSelector, {
      skipTypeSelection: isChannelTypeAvailable ? skipTypeSelection : true,
      onSelectType: onPressCreateChannel
    }));
  };
};
var _default = createGroupChannelListFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelListFragment.js.map