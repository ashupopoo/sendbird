import React from 'react';
import type { SendbirdMessage } from '@sendbird/uikit-utils';
type MessageStyleVariant = 'outgoing' | 'incoming';
export type MessageRendererInterface<T = SendbirdMessage, AdditionalProps = unknown> = {
    message: T;
    prevMessage?: SendbirdMessage;
    nextMessage?: SendbirdMessage;
    variant: MessageStyleVariant;
    groupWithPrev: boolean;
    groupWithNext: boolean;
    pressed: boolean;
    children?: React.ReactElement | null;
} & AdditionalProps;
declare const _default: React.MemoExoticComponent<(props: {
    focused: boolean;
    message: SendbirdMessage;
    prevMessage?: SendbirdMessage | undefined;
    nextMessage?: SendbirdMessage | undefined;
    onPress?: (() => void) | undefined;
    onLongPress?: (() => void) | undefined;
    onPressAvatar?: ((user: import("@sendbird/chat/groupChannel").Member | import("@sendbird/chat").User, options?: {
        hideMessageButton?: boolean | undefined;
    } | undefined) => void) | undefined;
    channel: import("@sendbird/chat/groupChannel").GroupChannel;
    currentUserId?: string | undefined;
    enableMessageGrouping: boolean;
}) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null>;
export default _default;
