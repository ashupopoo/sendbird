"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _chat = require("@sendbird/chat");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../../hooks/useContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const GroupChannelListList = _ref => {
  let {
    renderGroupChannelPreview,
    groupChannels,
    onLoadNext,
    flatListProps,
    menuItemCreator = _uikitUtils.PASS
  } = _ref;
  const toast = (0, _uikitReactNativeFoundation.useToast)();
  const {
    openMenu
  } = (0, _uikitReactNativeFoundation.useActionMenu)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    sdk,
    currentUser
  } = (0, _useContext.useSendbirdChat)();
  const onLongPress = (0, _uikitUtils.useFreshCallback)(channel => {
    const action = channel.myPushTriggerOption === 'off' ? 'on' : 'off';
    const menuItem = menuItemCreator({
      title: STRINGS.GROUP_CHANNEL_LIST.DIALOG_CHANNEL_TITLE((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? '', channel),
      menuItems: [{
        title: STRINGS.GROUP_CHANNEL_LIST.DIALOG_CHANNEL_NOTIFICATION(channel),
        onPress: async () => {
          if (action === 'on') {
            await channel.setMyPushTriggerOption(_chat.PushTriggerOption.DEFAULT);
          } else {
            await channel.setMyPushTriggerOption(_chat.PushTriggerOption.OFF);
          }
        },
        onError: () => {
          toast.show(action === 'on' ? STRINGS.TOAST.TURN_ON_NOTIFICATIONS_ERROR : STRINGS.TOAST.TURN_OFF_NOTIFICATIONS_ERROR, 'error');
        }
      }, {
        title: STRINGS.GROUP_CHANNEL_LIST.DIALOG_CHANNEL_LEAVE,
        onPress: async () => {
          channel.leave().then(() => sdk.clearCachedMessages([channel.url]).catch(_uikitUtils.NOOP));
        },
        onError: () => toast.show(STRINGS.TOAST.LEAVE_CHANNEL_ERROR, 'error')
      }]
    });
    openMenu(menuItem);
  });
  const renderItem = (0, _react.useCallback)(_ref2 => {
    let {
      item
    } = _ref2;
    return renderGroupChannelPreview === null || renderGroupChannelPreview === void 0 ? void 0 : renderGroupChannelPreview(item, () => onLongPress(item));
  }, [renderGroupChannelPreview, onLongPress]);
  const {
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, _extends({
    bounces: false,
    data: groupChannels,
    renderItem: renderItem,
    onEndReached: onLoadNext
  }, flatListProps, {
    contentContainerStyle: [flatListProps === null || flatListProps === void 0 ? void 0 : flatListProps.contentContainerStyle, {
      paddingLeft: left,
      paddingRight: right
    }],
    keyExtractor: _uikitUtils.getChannelUniqId
  }));
};
var _default = GroupChannelListList;
exports.default = _default;
//# sourceMappingURL=GroupChannelListList.js.map