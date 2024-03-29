import React from 'react';
import type { HeaderStyleContextType, UIKitTheme } from '@sendbird/uikit-react-native-foundation';
import type { SendbirdChatSDK, SendbirdGroupChannel, SendbirdGroupChannelCreateParams, SendbirdMember, SendbirdUser } from '@sendbird/uikit-utils';
import type { UIKitFeaturesInSendbirdChatContext } from '../contexts/SendbirdChatCtx';
import type { ImageCompressionConfigInterface } from '../libs/ImageCompressionConfig';
import { MentionConfigInterface } from '../libs/MentionConfig';
import type { StringSet } from '../localization/StringSet.type';
import type { ClipboardServiceInterface, FileServiceInterface, MediaServiceInterface, NotificationServiceInterface } from '../platform/types';
import type { ErrorBoundaryProps, LocalCacheStorage } from '../types';
export declare const SendbirdUIKit: Readonly<{
    VERSION: "2.5.0";
    PLATFORM: string;
    DEFAULT: {
        AUTO_PUSH_TOKEN_REGISTRATION: boolean;
        CHANNEL_LIST_TYPING_INDICATOR: boolean;
        CHANNEL_LIST_MESSAGE_RECEIPT_STATUS: boolean;
        USE_USER_ID_FOR_NICKNAME: boolean;
        USER_MENTION: boolean;
        IMAGE_COMPRESSION: boolean;
        MESSAGE_SEARCH: boolean;
    };
}>;
export type SendbirdUIKitContainerProps = React.PropsWithChildren<{
    appId: string;
    platformServices: {
        file: FileServiceInterface;
        notification: NotificationServiceInterface;
        clipboard: ClipboardServiceInterface;
        media: MediaServiceInterface;
    };
    chatOptions?: {
        localCacheStorage?: LocalCacheStorage;
        onInitialized?: (sdkInstance: SendbirdChatSDK) => SendbirdChatSDK;
    } & Partial<UIKitFeaturesInSendbirdChatContext>;
    localization?: {
        stringSet?: StringSet;
    };
    styles?: {
        theme?: UIKitTheme;
        statusBarTranslucent?: boolean;
        defaultHeaderTitleAlign?: 'left' | 'center';
        defaultHeaderHeight?: number;
        HeaderComponent?: HeaderStyleContextType['HeaderComponent'];
    };
    errorBoundary?: {
        disabled?: boolean;
        onError?: (props: ErrorBoundaryProps) => void;
        ErrorInfoComponent?: (props: ErrorBoundaryProps) => JSX.Element;
    };
    toast?: {
        dismissTimeout?: number;
    };
    userProfile?: {
        onCreateChannel: (channel: SendbirdGroupChannel) => void;
        onBeforeCreateChannel?: (channelParams: SendbirdGroupChannelCreateParams, users: SendbirdUser[] | SendbirdMember[]) => SendbirdGroupChannelCreateParams | Promise<SendbirdGroupChannelCreateParams>;
    };
    userMention?: Pick<Partial<MentionConfigInterface>, 'mentionLimit' | 'suggestionLimit' | 'debounceMills'>;
    imageCompression?: Partial<ImageCompressionConfigInterface>;
}>;
declare const SendbirdUIKitContainer: ({ children, appId, chatOptions, platformServices, localization, styles, errorBoundary, toast, userProfile, userMention, imageCompression, }: SendbirdUIKitContainerProps) => JSX.Element;
export default SendbirdUIKitContainer;
