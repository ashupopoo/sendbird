import React from 'react';
import { SendbirdMessage } from '@sendbird/uikit-utils';
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
    channel: import("@sendbird/chat/openChannel").OpenChannel;
    currentUserId?: string | undefined;
    enableMessageGrouping: boolean;
}) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null>;
export default _default;
