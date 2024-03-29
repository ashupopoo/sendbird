import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Sendbird from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';
import { OpenChannelModule } from '@sendbird/chat/openChannel';
import { DialogProvider, Header, HeaderStyleProvider, LightUIKitTheme, ToastProvider, UIKitThemeProvider } from '@sendbird/uikit-react-native-foundation';
import { NOOP, useIsFirstMount } from '@sendbird/uikit-utils';
import { LocalizationContext, LocalizationProvider } from '../contexts/LocalizationCtx';
import { PlatformServiceProvider } from '../contexts/PlatformServiceCtx';
import { ReactionProvider } from '../contexts/ReactionCtx';
import { SendbirdChatProvider } from '../contexts/SendbirdChatCtx';
import { UserProfileProvider } from '../contexts/UserProfileCtx';
import EmojiManager from '../libs/EmojiManager';
import ImageCompressionConfig from '../libs/ImageCompressionConfig';
import InternalLocalCacheStorage from '../libs/InternalLocalCacheStorage';
import MentionConfig from '../libs/MentionConfig';
import MentionManager from '../libs/MentionManager';
import StringSetEn from '../localization/StringSet.en';
import SBUDynamicModule from '../platform/dynamicModule';
import VERSION from '../version';
import InternalErrorBoundaryContainer from './InternalErrorBoundaryContainer';
const NetInfo = SBUDynamicModule.get('@react-native-community/netinfo', 'warn');
export const SendbirdUIKit = Object.freeze({
  VERSION,
  PLATFORM: Platform.OS.toLowerCase(),
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
  const defaultStringSet = (localization === null || localization === void 0 ? void 0 : localization.stringSet) ?? StringSetEn;
  const isFirstMount = useIsFirstMount();
  const unsubscribes = useRef([]);
  const internalStorage = useMemo(() => chatOptions !== null && chatOptions !== void 0 && chatOptions.localCacheStorage ? new InternalLocalCacheStorage(chatOptions.localCacheStorage) : undefined, [chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.localCacheStorage]);
  const [sdkInstance, setSdkInstance] = useState(() => {
    const sendbird = initializeSendbird(appId, internalStorage, chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.onInitialized);
    unsubscribes.current = sendbird.unsubscribes;
    return sendbird.chatSDK;
  });
  const emojiManager = useMemo(() => new EmojiManager(internalStorage), [internalStorage]);
  const mentionManager = useMemo(() => {
    const config = new MentionConfig({
      mentionLimit: (userMention === null || userMention === void 0 ? void 0 : userMention.mentionLimit) || MentionConfig.DEFAULT.MENTION_LIMIT,
      suggestionLimit: (userMention === null || userMention === void 0 ? void 0 : userMention.suggestionLimit) || MentionConfig.DEFAULT.SUGGESTION_LIMIT,
      debounceMills: (userMention === null || userMention === void 0 ? void 0 : userMention.debounceMills) ?? MentionConfig.DEFAULT.DEBOUNCE_MILLS,
      delimiter: MentionConfig.DEFAULT.DELIMITER,
      trigger: MentionConfig.DEFAULT.TRIGGER
    });
    return new MentionManager(config, (chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.enableUserMention) ?? SendbirdUIKit.DEFAULT.USER_MENTION);
  }, [chatOptions === null || chatOptions === void 0 ? void 0 : chatOptions.enableUserMention, userMention === null || userMention === void 0 ? void 0 : userMention.mentionLimit, userMention === null || userMention === void 0 ? void 0 : userMention.suggestionLimit, userMention === null || userMention === void 0 ? void 0 : userMention.debounceMills]);
  const imageCompressionConfig = useMemo(() => {
    return new ImageCompressionConfig({
      compressionRate: (imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.compressionRate) || ImageCompressionConfig.DEFAULT.COMPRESSION_RATE,
      width: imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.width,
      height: imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.height
    });
  }, [imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.compressionRate, imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.width, imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.height]);
  useLayoutEffect(() => {
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
      return /*#__PURE__*/React.createElement(InternalErrorBoundaryContainer, errorBoundary, children);
    }
  };
  return /*#__PURE__*/React.createElement(SafeAreaProvider, null, /*#__PURE__*/React.createElement(SendbirdChatProvider, {
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
  }, /*#__PURE__*/React.createElement(LocalizationProvider, {
    stringSet: defaultStringSet
  }, /*#__PURE__*/React.createElement(PlatformServiceProvider, {
    fileService: platformServices.file,
    notificationService: platformServices.notification,
    clipboardService: platformServices.clipboard,
    mediaService: platformServices.media
  }, /*#__PURE__*/React.createElement(UIKitThemeProvider, {
    theme: (styles === null || styles === void 0 ? void 0 : styles.theme) ?? LightUIKitTheme
  }, /*#__PURE__*/React.createElement(HeaderStyleProvider, {
    HeaderComponent: (styles === null || styles === void 0 ? void 0 : styles.HeaderComponent) ?? Header,
    defaultTitleAlign: (styles === null || styles === void 0 ? void 0 : styles.defaultHeaderTitleAlign) ?? 'left',
    statusBarTranslucent: (styles === null || styles === void 0 ? void 0 : styles.statusBarTranslucent) ?? true
  }, /*#__PURE__*/React.createElement(ToastProvider, {
    dismissTimeout: toast === null || toast === void 0 ? void 0 : toast.dismissTimeout
  }, /*#__PURE__*/React.createElement(UserProfileProvider, {
    onCreateChannel: userProfile === null || userProfile === void 0 ? void 0 : userProfile.onCreateChannel,
    onBeforeCreateChannel: userProfile === null || userProfile === void 0 ? void 0 : userProfile.onBeforeCreateChannel,
    statusBarTranslucent: (styles === null || styles === void 0 ? void 0 : styles.statusBarTranslucent) ?? true
  }, /*#__PURE__*/React.createElement(ReactionProvider, null, /*#__PURE__*/React.createElement(LocalizationContext.Consumer, null, value => {
    const STRINGS = (value === null || value === void 0 ? void 0 : value.STRINGS) || defaultStringSet;
    return /*#__PURE__*/React.createElement(DialogProvider, {
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
  chatSDK = Sendbird.init({
    appId,
    modules: [new GroupChannelModule(), new OpenChannelModule()],
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
      NetInfo.addEventListener(NOOP)();
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
export default SendbirdUIKitContainer;
//# sourceMappingURL=SendbirdUIKitContainer.js.map