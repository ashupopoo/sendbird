"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _message = require("@sendbird/chat/message");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../hooks/useContext");
var _SBUError = _interopRequireDefault(require("../../libs/SBUError"));
var _SBUUtils = _interopRequireDefault(require("../../libs/SBUUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SendInput = /*#__PURE__*/(0, _react.forwardRef)(function SendInput(_ref, ref) {
  let {
    onPressSendUserMessage,
    onPressSendFileMessage,
    onSendUserMessage,
    onSendFileMessage,
    text,
    onChangeText,
    onSelectionChange,
    mentionedUsers,
    inputDisabled,
    inputFrozen,
    inputMuted
  } = _ref;
  const {
    mentionManager,
    imageCompressionConfig,
    features
  } = (0, _useContext.useSendbirdChat)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    fileService,
    mediaService
  } = (0, _useContext.usePlatformService)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    openSheet
  } = (0, _uikitReactNativeFoundation.useBottomSheet)();
  const {
    alert
  } = (0, _uikitReactNativeFoundation.useAlert)();
  const toast = (0, _uikitReactNativeFoundation.useToast)();
  const sendUserMessage = () => {
    const mentionType = _message.MentionType.USERS;
    const mentionedUserIds = mentionedUsers.map(it => it.user.userId);
    const mentionedMessageTemplate = mentionManager.textToMentionedMessageTemplate(text, mentionedUsers);
    if (onPressSendUserMessage) {
      onPressSendUserMessage({
        message: text,
        mentionType,
        mentionedUserIds,
        mentionedMessageTemplate
      }).catch(onFailureToSend);
    } else if (onSendUserMessage) {
      onSendUserMessage(text, {
        type: mentionType,
        userIds: mentionedUserIds,
        messageTemplate: mentionedMessageTemplate
      }).catch(onFailureToSend);
    }
    onChangeText('');
  };
  const sendFileMessage = file => {
    if (onPressSendFileMessage) {
      onPressSendFileMessage({
        file
      }).catch(onFailureToSend);
    } else if (onSendFileMessage) {
      onSendFileMessage(file).catch(onFailureToSend);
    }
  };
  const onFailureToSend = () => toast.show(STRINGS.TOAST.SEND_MSG_ERROR, 'error');
  const onPressAttachment = () => {
    openSheet({
      sheetItems: [{
        title: STRINGS.LABELS.CHANNEL_INPUT_ATTACHMENT_CAMERA,
        icon: 'camera',
        onPress: async () => {
          const mediaFile = await fileService.openCamera({
            mediaType: 'all',
            onOpenFailure: error => {
              if (error.code === _SBUError.default.CODE.ERR_PERMISSIONS_DENIED) {
                alert({
                  title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
                  message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_CAMERA, STRINGS.LABELS.PERMISSION_APP_NAME),
                  buttons: [{
                    text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
                    onPress: () => _SBUUtils.default.openSettings()
                  }]
                });
              } else {
                toast.show(STRINGS.TOAST.OPEN_CAMERA_ERROR, 'error');
              }
            }
          });
          if (mediaFile) {
            // Image compression
            if ((0, _uikitUtils.isImage)(mediaFile.uri, mediaFile.type) && (0, _uikitUtils.shouldCompressImage)(mediaFile.type, features.imageCompressionEnabled)) {
              await _SBUUtils.default.safeRun(async () => {
                const compressed = await mediaService.compressImage({
                  uri: mediaFile.uri,
                  maxWidth: imageCompressionConfig.width,
                  maxHeight: imageCompressionConfig.height,
                  compressionRate: imageCompressionConfig.compressionRate
                });
                if (compressed) {
                  mediaFile.uri = compressed.uri;
                  mediaFile.size = compressed.size;
                }
              });
            }
            sendFileMessage(mediaFile);
          }
        }
      }, {
        title: STRINGS.LABELS.CHANNEL_INPUT_ATTACHMENT_PHOTO_LIBRARY,
        icon: 'photo',
        onPress: async () => {
          const mediaFiles = await fileService.openMediaLibrary({
            selectionLimit: 1,
            mediaType: 'all',
            onOpenFailure: error => {
              if (error.code === _SBUError.default.CODE.ERR_PERMISSIONS_DENIED) {
                alert({
                  title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
                  message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_DEVICE_STORAGE, STRINGS.LABELS.PERMISSION_APP_NAME),
                  buttons: [{
                    text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
                    onPress: () => _SBUUtils.default.openSettings()
                  }]
                });
              } else {
                toast.show(STRINGS.TOAST.OPEN_PHOTO_LIBRARY_ERROR, 'error');
              }
            }
          });
          if (mediaFiles && mediaFiles[0]) {
            const mediaFile = mediaFiles[0];

            // Image compression
            if ((0, _uikitUtils.isImage)(mediaFile.uri, mediaFile.type) && (0, _uikitUtils.shouldCompressImage)(mediaFile.type, features.imageCompressionEnabled)) {
              await _SBUUtils.default.safeRun(async () => {
                const compressed = await mediaService.compressImage({
                  uri: mediaFile.uri,
                  maxWidth: imageCompressionConfig.width,
                  maxHeight: imageCompressionConfig.height,
                  compressionRate: imageCompressionConfig.compressionRate
                });
                if (compressed) {
                  mediaFile.uri = compressed.uri;
                  mediaFile.size = compressed.size;
                }
              });
            }
            sendFileMessage(mediaFile);
          }
        }
      }, {
        title: STRINGS.LABELS.CHANNEL_INPUT_ATTACHMENT_FILES,
        icon: 'document',
        onPress: async () => {
          const documentFile = await fileService.openDocument({
            onOpenFailure: () => toast.show(STRINGS.TOAST.OPEN_FILES_ERROR, 'error')
          });
          if (documentFile) {
            // Image compression
            if ((0, _uikitUtils.isImage)(documentFile.uri, documentFile.type) && (0, _uikitUtils.shouldCompressImage)(documentFile.type, features.imageCompressionEnabled)) {
              await _SBUUtils.default.safeRun(async () => {
                const compressed = await mediaService.compressImage({
                  uri: documentFile.uri,
                  maxWidth: imageCompressionConfig.width,
                  maxHeight: imageCompressionConfig.height,
                  compressionRate: imageCompressionConfig.compressionRate
                });
                if (compressed) {
                  documentFile.uri = compressed.uri;
                  documentFile.size = compressed.size;
                }
              });
            }
            sendFileMessage(documentFile);
          }
        }
      }]
    });
  };
  const getPlaceholder = () => {
    if (!inputDisabled) return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_ACTIVE;
    if (inputFrozen) return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_DISABLED;
    if (inputMuted) return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_MUTED;
    return STRINGS.LABELS.CHANNEL_INPUT_PLACEHOLDER_DISABLED;
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.sendInputContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPressAttachment,
    disabled: inputDisabled
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    color: inputDisabled ? colors.ui.input.default.disabled.highlight : colors.ui.input.default.active.highlight,
    icon: 'add',
    size: 24,
    containerStyle: styles.iconAttach
  })), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.TextInput, {
    ref: ref,
    multiline: true,
    disableFullscreenUI: true,
    onSelectionChange: onSelectionChange,
    editable: !inputDisabled,
    onChangeText: onChangeText,
    style: styles.input,
    placeholder: getPlaceholder()
  }, mentionManager.textToMentionedComponents(text, mentionedUsers)), Boolean(text.trim()) && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: sendUserMessage,
    disabled: inputDisabled
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    color: inputDisabled ? colors.ui.input.default.disabled.highlight : colors.ui.input.default.active.highlight,
    icon: 'send',
    size: 24,
    containerStyle: styles.iconSend
  })));
});
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  sendInputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    marginRight: 4,
    minHeight: 36,
    maxHeight: 36 * _reactNative.Platform.select({
      ios: 2.5,
      default: 2
    }),
    borderRadius: 20
  },
  iconAttach: {
    marginRight: 8,
    padding: 4
  },
  iconSend: {
    marginLeft: 4,
    padding: 4
  }
});
var _default = SendInput;
exports.default = _default;
//# sourceMappingURL=SendInput.js.map