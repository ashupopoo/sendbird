import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { TextProps } from '../../components/Text';
import type { BaseHeaderProps } from '../../index';
type HeaderElement = string | React.ReactElement | null;
export type HeaderProps = BaseHeaderProps<{
    title?: HeaderElement;
    left?: HeaderElement;
    right?: HeaderElement;
    onPressLeft?: () => void;
    onPressRight?: () => void;
}, {
    clearTitleMargin?: boolean;
    clearStatusBarTopInset?: boolean;
    statusBarTopInsetAs?: 'padding' | 'margin';
}>;
declare const Header: ((props: HeaderProps) => JSX.Element) & {
    Button: typeof HeaderButton;
    Title: typeof HeaderTitle;
    Subtitle: typeof HeaderSubtitle;
};
declare const HeaderTitle: ({ children, style, ...props }: TextProps) => JSX.Element;
declare const HeaderSubtitle: ({ children, style, ...props }: TextProps) => JSX.Element;
declare const HeaderButton: ({ children, disabled, onPress, color, ...props }: TouchableOpacityProps & {
    color?: string | undefined;
}) => JSX.Element;
export default Header;
