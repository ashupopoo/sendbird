"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SendbirdUIKit = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _chat = _interopRequireDefault(require("@sendbird/chat"));
var _groupChannel = require("@sendbird/chat/groupChannel");
var _openChannel = require("@sendbird/chat/openChannel");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _LocalizationCtx = require("../contexts/LocalizationCtx");
var _PlatformServiceCtx = require("../contexts/PlatformServiceCtx");
var _ReactionCtx = require("../contexts/ReactionCtx");
var _SendbirdChatCtx = require("../contexts/SendbirdChatCtx");
var _UserProfileCtx = require("../contexts/UserProfileCtx");
var _EmojiManager = _interopRequireDefault(require("../libs/EmojiManager"));
var _ImageCompressionConfig = _interopRequireDefault(require("../libs/ImageCompressionConfig"));
var _InternalLocalCacheStorage = _interopRequireDefault(require("../libs/InternalLocalCacheStorage"));
var _MentionConfig = _interopRequireDefault(require("../libs/MentionConfig"));
var _MentionManager = _interopRequireDefault(require("../libs/MentionManager"));
var _StringSet = _interopRequireDefault(require("../localization/StringSet.en"));
var _dynamicModule = _interopRequireDefault(require("../platform/dynamicModule"));
var _version = _interopRequireDefault(require("../version"));
var _InternalErrorBoundaryContainer = _interopRequireDefault(require("./InternalErrorBoundaryContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const NetInfo = _dynamicModule.default.get('@react-native-community/netinfo', 'warn');
const SendbirdUIKit = Object.freeze({
  VERSION: _version.default,
  PLATFORM: _reactNative.Platform.OS.toLowerCase(),
  DEFAULT: {
    AUTO_PUSH_TOKEN_REGISTRATION: true,
    CHANNEL_LIST_TYPING_INDICATOR: false,
    CHANNEL_LIST_MESSAGE_RECEIPT_STATUS: false,
    USE_USER_ID_FOR_NICKNAME: false,
    USER_MENTION: false,
    IMAGE_COMPRESSION: true,
    MESSAGE_SEARCH: false
  }
});
exports.SendbirdUIKit = SendbirdUIKit;
const SendbirdUIKitContainer = _ref => {
  let {
    children,
    appId,
    chatOptions,
    platformServices,
    localization,
    styles,
    errorBoundary,
    toast,
    userProfile,
    userMention,
    imageCompression
  } = _ref;
  const defaultStringSet = (localization === null || localization === void 0 ? void 0 : localization.stringSet) ?? _StringSet.default;
  const isFirstMount = (0, _uikitUtils.useIsFirstMount)();
  const unsubscribes = (0, _react.useRef)([]);
  const internalStorage = (0, _react.useMemo)(() => chatOptions !== null && chatOptions !== void 0 && chatOptions.localCacheStorage ? new _InternalLocalCacheStorage.default(chatOptions.localCacheStorage) : undefined, [chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.localCacheStorage]);
  const [sdkInstance, setSdkInstance] = (0, _react.useState)(() => {
    const sendbird = initializeSendbird(appId, internalStorage, chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.onInitialized);
    unsubscribes.current = sendbird.unsubscribes;
    return sendbird.chatSDK;
  });
  const emojiManager = (0, _react.useMemo)(() => new _EmojiManager.default(internalStorage), [internalStorage]);
  const mentionManager = (0, _react.useMemo)(() => {
    const config = new _MentionConfig.default({
      mentionLimit: (userMention === null || userMention === void 0 ? void 0 : userMention.mentionLimit) || _MentionConfig.default.DEFAULT.MENTION_LIMIT,
      suggestionLimit: (userMention === null || userMention === void 0 ? void 0 : userMention.suggestionLimit) || _MentionConfig.default.DEFAULT.SUGGESTION_LIMIT,
      debounceMills: (userMention === null || userMention === void 0 ? void 0 : userMention.debounceMills) ?? _MentionConfig.default.DEFAULT.DEBOUNCE_MILLS,
      delimiter: _MentionConfig.default.DEFAULT.DELIMITER,
      trigger: _MentionConfig.default.DEFAULT.TRIGGER
    });
    return new _MentionManager.default(config, (chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.enableUserMention) ?? SendbirdUIKit.DEFAULT.USER_MENTION);
  }, [chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.enableUserMention, userMention === null || userMention === void 0 ? void 0 : userMention.mentionLimit, userMention === null || userMention === void 0 ? void 0 : userMention.suggestionLimit, userMention === null || userMention === void 0 ? void 0 : userMention.debounceMills]);
  const imageCompressionConfig = (0, _react.useMemo)(() => {
    return new _ImageCompressionConfig.default({
      compressionRate: (imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.compressionRate) || _ImageCompressionConfig.default.DEFAULT.COMPRESSION_RATE,
      width: imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.width,
      height: imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.height
    });
  }, [imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.compressionRate, imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.width, imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.height]);
  (0, _react.useLayoutEffect)(() => {
    if (!isFirstMount) {
      const sendbird = initializeSendbird(appId, internalStorage, chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.onInitialized);
      setSdkInstance(sendbird.chatSDK);
      unsubscribes.current = sendbird.unsubscribes;
    }
    return () => {
      if (!isFirstMount) {
        unsubscribes.current.forEach(u => {
          try {
            u();
          } catch {}
        });
      }
    };
  }, [appId, internalStorage]);
  const renderChildren = () => {
    if (errorBoundary !== null && errorBoundary !== void 0 && errorBoundary.disabled) {
      return children;
    } else {
      return /*#__PURE__*/_react.default.createElement(_InternalErrorBoundaryContainer.default, errorBoundary, children);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaProvider, null, /*#__PURE__*/_react.default.createElement(_SendbirdChatCtx.SendbirdChatProvider, {
    sdkInstance: sdkInstance,
    emojiManager: emojiManager,
    mentionManager: mentionManager,
    imageCompressionConfig: imageCompressionConfig,
    enableAutoPushTokenRegistration: (chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.enableAutoPushTokenRegistration) ?? SendbirdUIKit.DEFAULT.AUTO_PUSH_TOKEN_REGISTRATION,
    enableChannelListTypingIndicator: (chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.enableChannelListTypingIndicator) ?? SendbirdUIKit.DEFAULT.CHANNEL_LIST_TYPING_INDICATOR,
    enableChannelListMessageReceiptStatus: (chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.enableChannelListMessageReceiptStatus) ?? SendbirdUIKit.DEFAULT.CHANNEL_LIST_MESSAGE_RECEIPT_STATUS,
    enableUseUserIdForNickname: (chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.enableUseUserIdForNickname) ?? SendbirdUIKit.DEFAULT.USE_USER_ID_FOR_NICKNAME,
    enableUserMention: (chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.enableUserMention) ?? SendbirdUIKit.DEFAULT.USER_MENTION,
    enableImageCompression: (chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.enableImageCompression) ?? SendbirdUIKit.DEFAULT.IMAGE_COMPRESSION,
    enableMessageSearch: (chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.enableMessageSearch) ?? SendbirdUIKit.DEFAULT.MESSAGE_SEARCH
  }, /*#__PURE__*/_react.default.createElement(_LocalizationCtx.LocalizationProvider, {
    stringSet: defaultStringSet
  }, /*#__PURE__*/_react.default.createElement(_PlatformServiceCtx.PlatformServiceProvider, {
    fileService: platformServices.file,
    notificationService: platformServices.notification,
    clipboardService: platformServices.clipboard,
    mediaService: platformServices.media
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.UIKitThemeProvider, {
    theme: (styles === null || styles === void 0 ? void 0 : styles.theme) ?? _uikitReactNativeFoundation.LightUIKitTheme
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.HeaderStyleProvider, {
    HeaderComponent: (styles === null || styles === void 0 ? void 0 : styles.HeaderComponent) ?? _uikitReactNativeFoundation.Header,
    defaultTitleAlign: (styles === null || styles === void 0 ? void 0 : styles.defaultHeaderTitleAlign) ?? 'left',
    statusBarTranslucent: (styles === null || styles === void 0 ? void 0 : styles.statusBarTranslucent) ?? true
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.ToastProvider, {
    dismissTimeout: toast === null || toast === void 0 ? void 0 : toast.dismissTimeout
  }, /*#__PURE__*/_react.default.createElement(_UserProfileCtx.UserProfileProvider, {
    onCreateChannel: userProfile === null || userProfile === void 0 ? void 0 : userProfile.onCreateChannel,
    onBeforeCreateChannel: userProfile === null || userProfile === void 0 ? void 0 : userProfile.onBeforeCreateChannel,
    statusBarTranslucent: (styles === null || styles === void 0 ? void 0 : styles.statusBarTranslucent) ?? true
  }, /*#__PURE__*/_react.default.createElement(_ReactionCtx.ReactionProvider, null, /*#__PURE__*/_react.default.createElement(_LocalizationCtx.LocalizationContext.Consumer, null, value => {
    const STRINGS = (value === null || value === void 0 ? void 0 : value.STRINGS) || defaultStringSet;
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.DialogProvider, {
      defaultLabels: {
        alert: {
          ok: STRINGS.DIALOG.ALERT_DEFAULT_OK
        },
        prompt: {
          ok: STRINGS.DIALOG.PROMPT_DEFAULT_OK,
          cancel: STRINGS.DIALOG.PROMPT_DEFAULT_CANCEL,
          placeholder: STRINGS.DIALOG.PROMPT_DEFAULT_PLACEHOLDER
        }
      }
    }, renderChildren());
  }))))))))));
};
const initializeSendbird = (appId, internalStorage, onInitialized) => {
  const unsubscribes = [];
  let chatSDK;
  chatSDK = _chat.default.init({
    appId,
    modules: [new _groupChannel.GroupChannelModule(), new _openChannel.OpenChannelModule()],
    localCacheEnabled: Boolean(internalStorage),
    useAsyncStorageStore: internalStorage,
    newInstance: true
  });
  if (onInitialized) {
    chatSDK = onInitialized(chatSDK);
  }
  if (SendbirdUIKit.VERSION) {
    chatSDK.addExtension('sb_uikit', SendbirdUIKit.VERSION);
  }
  if (SendbirdUIKit.PLATFORM) {
    chatSDK.addExtension('device-os-platform', SendbirdUIKit.PLATFORM);
  }
  if (NetInfo !== null && NetInfo !== void 0 && NetInfo.addEventListener) {
    var _chatSDK$setOnlineLis, _chatSDK, _chatSDK$setOfflineLi, _chatSDK2;
    try {
      // NOTE: For removing buggy behavior of NetInfo.addEventListener
      //  When you first add an event listener, it is assumed that the initialization of the internal event detector is done simultaneously.
      //  In other words, when you call the first event listener two events are triggered immediately
      //   - the one that is called when adding the event listener
      //   - and the internal initialization event
      NetInfo.addEventListener(_uikitUtils.NOOP)();
    } catch {}
    const listener = (callback, callbackType) => {
      let callCount = 0;
      const unsubscribe = NetInfo.addEventListener(state => {
        const online = Boolean(state.isConnected) || Boolean(state.isInternetReachable);

        // NOTE: When NetInfo.addEventListener is called
        //  the event is immediately triggered regardless of whether the event actually occurred.
        //  This is why it filters the first event.
        if (callCount === 0) {
          callCount++;
          return;
        }
        if (online && callbackType === 'online') callback();
        if (!online && callbackType === 'offline') callback();
      });
      unsubscribes.push(unsubscribe);
      return unsubscribe;
    };
    (_chatSDK$setOnlineLis = (_chatSDK = chatSDK).setOnlineListener) === null || _chatSDK$setOnlineLis === void 0 ? void 0 : _chatSDK$setOnlineLis.call(_chatSDK, onOnline => listener(onOnline, 'online'));
    (_chatSDK$setOfflineLi = (_chatSDK2 = chatSDK).setOfflineListener) === null || _chatSDK$setOfflineLi === void 0 ? void 0 : _chatSDK$setOfflineLi.call(_chatSDK2, onOffline => listener(onOffline, 'offline'));
  }
  return {
    chatSDK,
    unsubscribes
  };
};
var _default = SendbirdUIKitContainer;
exports.default = _default;
//# sourceMappingURL=SendbirdUIKitContainer.js.map