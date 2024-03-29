"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupChannelContextsProvider = exports.GroupChannelContexts = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitUtils = require("@sendbird/uikit-utils");
var _ProviderLayout = _interopRequireDefault(require("../../../components/ProviderLayout"));
var _useContext = require("../../../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GroupChannelContexts = {
  Fragment: /*#__PURE__*/(0, _react.createContext)({
    headerTitle: '',
    channel: {},
    setMessageToEdit: _uikitUtils.NOOP
  }),
  TypingIndicator: /*#__PURE__*/(0, _react.createContext)({
    typingUsers: []
  }),
  PubSub: /*#__PURE__*/(0, _react.createContext)({
    publish: _uikitUtils.NOOP,
    subscribe: () => _uikitUtils.NOOP
  })
};
exports.GroupChannelContexts = GroupChannelContexts;
const GroupChannelContextsProvider = _ref => {
  let {
    children,
    channel,
    enableTypingIndicator,
    keyboardAvoidOffset = 0,
    groupChannelPubSub
  } = _ref;
  if (!channel) throw new Error('GroupChannel is not provided to GroupChannelModule');
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('GroupChannelContextsProvider');
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    currentUser,
    sdk
  } = (0, _useContext.useSendbirdChat)();
  const [typingUsers, setTypingUsers] = (0, _react.useState)([]);
  const [messageToEdit, setMessageToEdit] = (0, _react.useState)();
  (0, _uikitChatHooks.useChannelHandler)(sdk, handlerId, {
    onTypingStatusUpdated(eventChannel) {
      if ((0, _uikitUtils.isDifferentChannel)(channel, eventChannel)) return;
      if (!enableTypingIndicator) return;
      setTypingUsers(eventChannel.getTypingUsers());
    }
  });
  return /*#__PURE__*/_react.default.createElement(_ProviderLayout.default, null, /*#__PURE__*/_react.default.createElement(GroupChannelContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.GROUP_CHANNEL.HEADER_TITLE((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? '', channel),
      channel,
      messageToEdit,
      setMessageToEdit,
      keyboardAvoidOffset
    }
  }, /*#__PURE__*/_react.default.createElement(GroupChannelContexts.TypingIndicator.Provider, {
    value: {
      typingUsers
    }
  }, /*#__PURE__*/_react.default.createElement(GroupChannelContexts.PubSub.Provider, {
    value: groupChannelPubSub
  }, children))));
};
exports.GroupChannelContextsProvider = GroupChannelContextsProvider;
//# sourceMappingURL=moduleContext.js.map