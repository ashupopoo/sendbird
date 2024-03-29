import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Icon, Image, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { getAvailableUriFromFileMessage, useForceUpdate } from '@sendbird/uikit-utils';
const useRetry = function (hasError) {
  let retryCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  if (Platform.OS === 'android') return '';
  const forceUpdate = useForceUpdate();
  const retryCountRef = useRef(1);
  const retryTimeoutRef = useRef();
  useEffect(() => {
    if (hasError) {
      const reloadReservation = () => {
        if (retryCountRef.current < retryCount) {
          retryTimeoutRef.current = setTimeout(() => {
            retryCountRef.current++;
            reloadReservation();
            forceUpdate();
          }, retryCountRef.current * 5000);
        }
      };
      return reloadReservation();
    } else {
      return clearTimeout(retryTimeoutRef.current);
    }
  }, [hasError]);
  return retryCountRef.current;
};
const ImageFileMessage = _ref => {
  let {
    message,
    children,
    variant
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const [imageNotFound, setImageNotFound] = useState(false);
  const fileUrl = getAvailableUriFromFileMessage(message);
  const style = [styles.image, {
    backgroundColor: colors.onBackground04
  }];
  const key = useRetry(imageNotFound);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.bubbleContainer, {
      backgroundColor: imageNotFound ? colors.onBackground04 : colors.ui.groupChannelMessage[variant].enabled.background
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: style
  }, /*#__PURE__*/React.createElement(Image, {
    key: key,
    source: {
      uri: fileUrl
    },
    style: [StyleSheet.absoluteFill, imageNotFound && styles.hide],
    resizeMode: 'cover',
    resizeMethod: 'resize',
    onError: () => setImageNotFound(true),
    onLoad: () => setImageNotFound(false)
  }), imageNotFound && /*#__PURE__*/React.createElement(Icon, {
    containerStyle: StyleSheet.absoluteFill,
    icon: 'thumbnail-none',
    size: 48,
    color: colors.onBackground02
  })), children);
};
const styles = createStyleSheet({
  bubbleContainer: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  image: {
    width: 240,
    maxWidth: 240,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden'
  },
  hide: {
    display: 'none'
  }
});
export default ImageFileMessage;
//# sourceMappingURL=ImageFileMessage.js.map