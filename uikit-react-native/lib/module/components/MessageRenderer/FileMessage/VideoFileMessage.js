import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Icon, Image, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { getAvailableUriFromFileMessage } from '@sendbird/uikit-utils';
import { usePlatformService } from '../../../hooks/useContext';
const useRetry = function (videoFileUrl) {
  let retryCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  const [state, setState] = useState({
    thumbnail: null,
    loading: true
  });
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef();
  const {
    mediaService
  } = usePlatformService();
  const fetchThumbnail = () => {
    return mediaService.getVideoThumbnail({
      url: videoFileUrl,
      timeMills: 1000
    }).then(result => {
      setState({
        loading: false,
        thumbnail: (result === null || result === void 0 ? void 0 : result.path) ?? null
      });
    });
  };
  useEffect(() => {
    if (!state.thumbnail) {
      const reloadReservation = () => {
        if (retryCountRef.current < retryCount) {
          retryTimeoutRef.current = setTimeout(() => {
            retryCountRef.current++;
            reloadReservation();
            fetchThumbnail();
          }, retryCountRef.current * 5000);
        }
      };
      return reloadReservation();
    } else {
      return clearTimeout(retryTimeoutRef.current);
    }
  }, [state.thumbnail]);
  return state;
};
const VideoFileMessage = _ref => {
  let {
    message,
    variant,
    children
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const fileUrl = getAvailableUriFromFileMessage(message);
  const style = [styles.video, {
    backgroundColor: colors.onBackground04
  }];
  const {
    loading,
    thumbnail
  } = useRetry(fileUrl);
  if (loading) {
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.bubbleContainer, {
        backgroundColor: colors.ui.groupChannelMessage[variant].enabled.background
      }]
    }, /*#__PURE__*/React.createElement(View, {
      style: [styles.bubbleContainer, styles.bubbleInnerContainer]
    }, /*#__PURE__*/React.createElement(View, {
      style: style
    }), /*#__PURE__*/React.createElement(PlayIcon, null)), children);
  }
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.bubbleContainer, {
      backgroundColor: colors.ui.groupChannelMessage[variant].enabled.background
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.bubbleContainer, styles.bubbleInnerContainer]
  }, /*#__PURE__*/React.createElement(Image, {
    source: {
      uri: thumbnail || fileUrl
    },
    style: style,
    resizeMode: 'cover',
    resizeMethod: 'resize'
  }), /*#__PURE__*/React.createElement(PlayIcon, null)), children);
};
const PlayIcon = () => {
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(Icon, {
    icon: 'play',
    size: 28,
    color: colors.onBackground02,
    containerStyle: [styles.playIcon, {
      backgroundColor: colors.onBackgroundReverse01
    }]
  });
};
const styles = createStyleSheet({
  bubbleContainer: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  bubbleInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  video: {
    width: 240,
    maxWidth: 240,
    height: 160
  },
  playIcon: {
    position: 'absolute',
    padding: 10,
    borderRadius: 50
  }
});
export default VideoFileMessage;
//# sourceMappingURL=VideoFileMessage.js.map