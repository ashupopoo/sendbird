import React from 'react';
import type { SendbirdChatSDK, SendbirdGroupChannel, SendbirdUser } from '@sendbird/uikit-utils';
import type EmojiManager from '../libs/EmojiManager';
import type ImageCompressionConfig from '../libs/ImageCompressionConfig';
import type MentionManager from '../libs/MentionManager';
import type { FileType } from '../platform/types';
export interface UIKitFeaturesInSendbirdChatContext {
    enableAutoPushTokenRegistration: boolean;
    enableChannelListTypingIndicator: boolean;
    enableChannelListMessageReceiptStatus: boolean;
    enableUseUserIdForNickname: boolean;
    enableUserMention: boolean;
    enableImageCompression: boolean;
    enableMessageSearch: boolean;
}
interface Props extends UIKitFeaturesInSendbirdChatContext, React.PropsWithChildren {
    sdkInstance: SendbirdChatSDK;
    emojiManager: EmojiManager;
    mentionManager: MentionManager;
    imageCompressionConfig: ImageCompressionConfig;
}
export type SendbirdChatContextType = {
    sdk: SendbirdChatSDK;
    emojiManager: EmojiManager;
    mentionManager: MentionManager;
    imageCompressionConfig: ImageCompressionConfig;
    currentUser?: SendbirdUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<SendbirdUser | undefined>>;
    updateCurrentUserInfo: (nickname?: string, profile?: string | FileType) => Promise<SendbirdUser>;
    markAsDeliveredWithChannel: (channel: SendbirdGroupChannel) => void;
    features: {
        autoPushTokenRegistrationEnabled: boolean;
        channelListTypingIndicatorEnabled: boolean;
        channelListMessageReceiptStatusEnabled: boolean;
        useUserIdForNicknameEnabled: boolean;
        userMentionEnabled: boolean;
        imageCompressionEnabled: boolean;
        messageSearchEnabled: boolean;
        deliveryReceiptEnabled: boolean;
        broadcastChannelEnabled: boolean;
        superGroupChannelEnabled: boolean;
        reactionEnabled: boolean;
    };
};
export declare const SendbirdChatContext: React.Context<SendbirdChatContextType | null>;
export declare const SendbirdChatProvider: ({ children, sdkInstance, emojiManager, mentionManager, imageCompressionConfig, enableAutoPushTokenRegistration, enableChannelListMessageReceiptStatus, enableChannelListTypingIndicator, enableUseUserIdForNickname, enableUserMention, enableImageCompression, enableMessageSearch, }: Props) => JSX.Element;
export {};
