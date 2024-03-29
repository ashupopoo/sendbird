import { MessageSearchOrder } from '@sendbird/chat/message';
import type { SendbirdBaseChannel, SendbirdBaseMessage, SendbirdDataPayload, SendbirdFileMessage, SendbirdGroupChannel, SendbirdMessage, SendbirdReaction, SendbirdSendableMessage } from '../types';
export declare function isNewMessage(msg: SendbirdMessage, currentUserId?: string): boolean;
export declare function isSendableMessage(msg?: SendbirdMessage | null): msg is SendbirdSendableMessage;
export declare function isMyMessage(msg?: SendbirdMessage | null, currentUserId?: string): boolean;
export declare function messageKeyExtractor(message: SendbirdMessage): string;
export declare function messageComparator(a: SendbirdMessage, b: SendbirdMessage): number;
export declare function hasSameSender(a?: SendbirdMessage, b?: SendbirdMessage): boolean;
export declare function calcMessageGrouping(groupEnabled: boolean, curr: SendbirdMessage, prev?: SendbirdMessage, next?: SendbirdMessage): {
    groupWithPrev: boolean;
    groupWithNext: boolean;
};
export declare function getMessageUniqId(msg: SendbirdBaseMessage): string;
export declare function getAvailableUriFromFileMessage(message: SendbirdFileMessage): string;
type RawSendbirdDataPayload = {
    sendbird: string | object;
};
export declare function isSendbirdNotification(dataPayload?: {
    [key: string]: string | object;
}): dataPayload is RawSendbirdDataPayload;
export declare function parseSendbirdNotification(dataPayload: RawSendbirdDataPayload): SendbirdDataPayload;
export declare function shouldRenderReaction(channel: SendbirdBaseChannel, reactionEnabled: boolean): boolean;
export declare function getReactionCount(reaction: SendbirdReaction): number;
type MessageType = 'user' | 'admin' | 'file' | 'unknown' | `user.${'opengraph'}` | `file.${'image' | 'video' | 'audio'}`;
export declare function getFileTypeFromMessage(message: SendbirdFileMessage): "video" | "audio" | "image" | "file";
export declare function getMessageType(message: SendbirdMessage): MessageType;
export declare function getDefaultMessageSearchQueryParams(channel: SendbirdGroupChannel, keyword: string): {
    keyword: string;
    channelUrl: string;
    messageTimestampFrom: number;
    order: MessageSearchOrder;
};
export {};
