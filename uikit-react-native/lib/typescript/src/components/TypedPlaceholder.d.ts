type Props = {
    type: 'no-muted-members' | 'no-muted-participants' | 'no-banned-users' | 'no-channels' | 'no-messages' | 'no-users' | 'no-results-found' | 'error-wrong' | 'loading';
    onPressRetry?: () => void;
};
declare const TypedPlaceholder: ({ type, onPressRetry }: Props) => JSX.Element;
export default TypedPlaceholder;
