function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Linking } from 'react-native';
import { Logger, replaceUrlAsComponents } from '@sendbird/uikit-utils';
import createStyleSheet from '../../styles/createStyleSheet';
import Text from '../Text';
const openUrl = (url, httpProtocol) => {
  const targetUrl = httpProtocol ? url : 'https://' + url;
  Linking.openURL(targetUrl).catch(err => Logger.warn('[URLParsedText]', 'Cannot open url', err));
};
const URLParsedText = _ref => {
  let {
    children,
    onPressUrl = openUrl,
    strict,
    ...props
  } = _ref;
  const parsedChildren = React.Children.map(React.Children.toArray(children), child => {
    if (typeof child === 'string') {
      return replaceUrlAsComponents(child, url => {
        return /*#__PURE__*/React.createElement(Text, _extends({}, props, {
          suppressHighlighting: true,
          onPress: () => onPressUrl === null || onPressUrl === void 0 ? void 0 : onPressUrl(url, url.startsWith('http')),
          style: [props.style, styles.url]
        }), url);
      }, strict);
    }
    return child;
  });
  return /*#__PURE__*/React.createElement(Text, props, parsedChildren);
};
const styles = createStyleSheet({
  url: {
    textDecorationLine: 'underline'
  }
});
export default URLParsedText;
//# sourceMappingURL=index.js.map