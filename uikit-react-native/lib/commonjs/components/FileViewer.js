"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../hooks/useContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const FileViewer = _ref => {
  let {
    headerShown = true,
    deleteMessage,
    headerTopInset,
    fileMessage,
    onPressDownload,
    onPressDelete,
    onClose
  } = _ref;
  const [loading, setLoading] = (0, _react.useState)(true);
  const {
    bottom
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    currentUser
  } = (0, _useContext.useSendbirdChat)();
  const {
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    topInset,
    statusBarTranslucent,
    defaultHeight
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    fileService,
    mediaService
  } = (0, _useContext.usePlatformService)();
  const toast = (0, _uikitReactNativeFoundation.useToast)();
  const {
    alert
  } = (0, _uikitReactNativeFoundation.useAlert)();
  const basicTopInset = statusBarTranslucent ? topInset : 0;
  const canDelete = (0, _uikitUtils.isMyMessage)(fileMessage, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId);
  const fileType = (0, _uikitUtils.getFileType)(fileMessage.type || (0, _uikitUtils.getFileExtension)(fileMessage.url));
  (0, _react.useEffect)(() => {
    if (fileType === 'file') onClose();
  }, []);
  const fileViewer = (0, _uikitUtils.useIIFE)(() => {
    switch (fileType) {
      case 'image':
        {
          return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Image, {
            source: {
              uri: fileMessage.url
            },
            style: _reactNative.StyleSheet.absoluteFill,
            resizeMode: 'contain',
            onLoadEnd: () => setLoading(false)
          });
        }
      case 'video':
      case 'audio':
        {
          return /*#__PURE__*/_react.default.createElement(mediaService.VideoComponent, {
            source: {
              uri: fileMessage.url
            },
            style: [_reactNative.StyleSheet.absoluteFill, {
              top: basicTopInset + defaultHeight,
              bottom: defaultHeight + bottom
            }],
            resizeMode: 'contain',
            onLoad: () => setLoading(false)
          });
        }
      default:
        {
          return null;
        }
    }
  });
  const _onPressDelete = () => {
    if (!canDelete) return;
    if (onPressDelete) {
      onPressDelete(fileMessage);
    } else {
      alert({
        title: STRINGS.LABELS.CHANNEL_MESSAGE_DELETE_CONFIRM_TITLE,
        buttons: [{
          text: STRINGS.LABELS.CHANNEL_MESSAGE_DELETE_CONFIRM_CANCEL
        }, {
          text: STRINGS.LABELS.CHANNEL_MESSAGE_DELETE_CONFIRM_OK,
          style: 'destructive',
          onPress: () => {
            deleteMessage().then(() => {
              onClose();
            }).catch(() => {
              toast.show(STRINGS.TOAST.DELETE_MSG_ERROR, 'error');
            });
          }
        }]
      });
    }
  };
  const _onPressDownload = () => {
    if (onPressDownload) {
      onPressDownload(fileMessage);
    } else {
      if ((0, _uikitUtils.toMegabyte)(fileMessage.size) > 4) {
        toast.show(STRINGS.TOAST.DOWNLOAD_START, 'success');
      }
      fileService.save({
        fileUrl: fileMessage.url,
        fileName: fileMessage.name,
        fileType: fileMessage.type
      }).then(response => {
        toast.show(STRINGS.TOAST.DOWNLOAD_OK, 'success');
        _uikitUtils.Logger.log('File saved to', response);
      }).catch(err => {
        toast.show(STRINGS.TOAST.DOWNLOAD_ERROR, 'error');
        _uikitUtils.Logger.log('File save failure', err);
      });
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1,
      backgroundColor: palette.background700
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
    barStyle: 'light-content',
    animated: true
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, fileViewer, loading && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.LoadingSpinner, {
    style: {
      position: 'absolute'
    },
    size: 40,
    color: palette.primary300
  })), headerShown && /*#__PURE__*/_react.default.createElement(FileViewerHeader, {
    title: STRINGS.FILE_VIEWER.TITLE(fileMessage),
    subtitle: STRINGS.FILE_VIEWER.SUBTITLE(fileMessage),
    topInset: headerTopInset ?? basicTopInset,
    onClose: onClose
  }), /*#__PURE__*/_react.default.createElement(FileViewerFooter, {
    bottomInset: bottom,
    deleteShown: canDelete,
    onPressDelete: _onPressDelete,
    onPressDownload: _onPressDownload
  }));
};
const FileViewerHeader = _ref2 => {
  let {
    topInset,
    onClose,
    subtitle,
    title
  } = _ref2;
  const {
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    defaultHeight
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const {
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.headerContainer, {
      paddingLeft: styles.headerContainer.paddingHorizontal + left,
      paddingRight: styles.headerContainer.paddingHorizontal + right
    }, {
      paddingTop: topInset,
      height: defaultHeight + topInset,
      backgroundColor: palette.overlay01
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onClose,
    style: styles.barButton
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'close',
    size: 24,
    color: palette.onBackgroundDark01
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.barTitleContainer
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    h2: true,
    color: palette.onBackgroundDark01,
    style: styles.headerTitle,
    numberOfLines: 1
  }, (0, _uikitUtils.truncate)(title, {
    mode: 'mid',
    maxLen: 18
  })), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    caption2: true,
    color: palette.onBackgroundDark01,
    numberOfLines: 1
  }, subtitle)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.barButton
  }));
};
const FileViewerFooter = _ref3 => {
  let {
    bottomInset,
    deleteShown,
    onPressDelete,
    onPressDownload
  } = _ref3;
  const {
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    defaultHeight
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const {
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.footerContainer, {
      paddingLeft: styles.headerContainer.paddingHorizontal + left,
      paddingRight: styles.headerContainer.paddingHorizontal + right
    }, {
      paddingBottom: bottomInset,
      height: defaultHeight + bottomInset,
      backgroundColor: palette.overlay01
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPressDownload,
    style: styles.barButton
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'download',
    size: 24,
    color: palette.onBackgroundDark01
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.barTitleContainer
  }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPressDelete,
    style: styles.barButton,
    disabled: !deleteShown
  }, deleteShown && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'delete',
    size: 24,
    color: palette.onBackgroundDark01
  })));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  barButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  barTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    marginBottom: 2
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  }
});
var _default = FileViewer;
exports.default = _default;
//# sourceMappingURL=FileViewer.js.map