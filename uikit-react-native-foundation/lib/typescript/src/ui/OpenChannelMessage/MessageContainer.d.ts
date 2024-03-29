import type { SendbirdMessage } from '@sendbird/uikit-utils';
import type { OpenChannelMessageProps } from './index';
type Props = {
    pressed?: boolean;
};
declare const MessageContainer: ({ children, channel, grouped, pressed, ...props }: OpenChannelMessageProps<SendbirdMessage, Props>) => JSX.Element;
export default MessageContainer;
