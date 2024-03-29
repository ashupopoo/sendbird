"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _SBUError = _interopRequireDefault(require("../libs/SBUError"));
var _nativePermissionGranted = _interopRequireDefault(require("../utils/nativePermissionGranted"));
var _normalizeFile = _interopRequireDefault(require("../utils/normalizeFile"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getAndroidStoragePermissionsByAPILevel(permissionModule) {
  if (_reactNative.Platform.OS !== 'android') return [];
  if (_reactNative.Platform.Version > 32) {
    return [permissionModule.PERMISSIONS.ANDROID.READ_MEDIA_AUDIO, permissionModule.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, permissionModule.PERMISSIONS.ANDROID.READ_MEDIA_VIDEO];
  }
  if (_reactNative.Platform.Version > 28) {
    return [permissionModule.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
  }
  return [permissionModule.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, permissionModule.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
}
const createNativeFileService = _ref => {
  let {
    imagePickerModule,
    documentPickerModule,
    permissionModule,
    mediaLibraryModule,
    fsModule
  } = _ref;
  const cameraPermissions = _reactNative.Platform.select({
    ios: [permissionModule.PERMISSIONS.IOS.CAMERA, permissionModule.PERMISSIONS.IOS.MICROPHONE],
    android: [permissionModule.PERMISSIONS.ANDROID.CAMERA],
    default: []
  });
  const mediaLibraryPermissions = _reactNative.Platform.select({
    ios: [permissionModule.PERMISSIONS.IOS.MEDIA_LIBRARY, permissionModule.PERMISSIONS.IOS.PHOTO_LIBRARY],
    android: getAndroidStoragePermissionsByAPILevel(permissionModule),
    default: []
  });
  class NativeFileService {
    constructor() {
      _defineProperty(this, "buildDownloadPath", async options => {
        const dirname = _reactNative.Platform.select({
          android: fsModule.Dirs.CacheDir,
          default: fsModule.Dirs.DocumentDir
        });
        const context = {
          dirname,
          filename: options.fileName
        };
        const extension = (0, _uikitUtils.getFileExtension)(options.fileName) || (0, _uikitUtils.getFileExtensionFromMime)(options.fileType) || (0, _uikitUtils.getFileExtension)(options.fileUrl) || (await (0, _uikitUtils.getFileExtensionFromUri)(options.fileUrl));
        if (extension) context.filename = (0, _uikitUtils.normalizeFileName)(context.filename, extension);
        return {
          path: `${context.dirname}/${context.filename}`,
          ...context
        };
      });
      _defineProperty(this, "downloadFile", async options => {
        const {
          path,
          filename
        } = await this.buildDownloadPath(options);
        await fsModule.FileSystem.fetch(options.fileUrl, {
          path
        });
        return {
          downloadedPath: path,
          file: {
            name: filename,
            type: (0, _uikitUtils.getFileType)((0, _uikitUtils.getFileExtension)(path))
          }
        };
      });
    }
    async hasCameraPermission() {
      const status = await permissionModule.checkMultiple(cameraPermissions);
      return (0, _nativePermissionGranted.default)(status);
    }
    async requestCameraPermission() {
      const status = await permissionModule.requestMultiple(cameraPermissions);
      return (0, _nativePermissionGranted.default)(status);
    }
    async hasMediaLibraryPermission() {
      const status = await permissionModule.checkMultiple(mediaLibraryPermissions);
      if (__DEV__ && _reactNative.Platform.OS === 'ios' && status['ios.permission.MEDIA_LIBRARY'] === 'unavailable' && status['ios.permission.PHOTO_LIBRARY'] === 'granted') {
        return true;
      }
      return (0, _nativePermissionGranted.default)(status);
    }
    async requestMediaLibraryPermission() {
      const status = await permissionModule.requestMultiple(mediaLibraryPermissions);
      return (0, _nativePermissionGranted.default)(status);
    }
    async openCamera(options) {
      var _response$assets;
      const hasPermission = await this.hasCameraPermission();
      if (!hasPermission) {
        const granted = await this.requestCameraPermission();
        if (!granted) {
          var _options$onOpenFailur;
          options === null || options === void 0 ? void 0 : (_options$onOpenFailur = options.onOpenFailure) === null || _options$onOpenFailur === void 0 ? void 0 : _options$onOpenFailur.call(options, _SBUError.default.PERMISSIONS_DENIED);
          return null;
        }
      }
      const response = await imagePickerModule.launchCamera({
        presentationStyle: 'fullScreen',
        cameraType: (options === null || options === void 0 ? void 0 : options.cameraType) ?? 'back',
        mediaType: (() => {
          switch (options === null || options === void 0 ? void 0 : options.mediaType) {
            case 'photo':
              return 'photo';
            case 'video':
              return 'video';
            case 'all':
              return 'mixed';
            default:
              return 'photo';
          }
        })()
      });
      if (response.didCancel) return null;
      if (response.errorCode === 'camera_unavailable') {
        var _options$onOpenFailur2;
        options === null || options === void 0 ? void 0 : (_options$onOpenFailur2 = options.onOpenFailure) === null || _options$onOpenFailur2 === void 0 ? void 0 : _options$onOpenFailur2.call(options, _SBUError.default.DEVICE_UNAVAILABLE, new Error(response.errorMessage));
        return null;
      }
      const {
        fileName: name,
        fileSize: size,
        type,
        uri
      } = ((_response$assets = response.assets) === null || _response$assets === void 0 ? void 0 : _response$assets[0]) ?? {};
      return (0, _normalizeFile.default)({
        uri,
        size,
        name,
        type
      });
    }
    async openMediaLibrary(options) {
      /**
       * NOTE: options.selectionLimit {@link https://github.com/react-native-image-picker/react-native-image-picker#options}
       * We do not support 0 (any number of files)
       **/
      const selectionLimit = (options === null || options === void 0 ? void 0 : options.selectionLimit) || 1;
      const hasPermission = await this.hasMediaLibraryPermission();
      if (!hasPermission) {
        const granted = await this.requestMediaLibraryPermission();
        if (!granted) {
          var _options$onOpenFailur3;
          options === null || options === void 0 ? void 0 : (_options$onOpenFailur3 = options.onOpenFailure) === null || _options$onOpenFailur3 === void 0 ? void 0 : _options$onOpenFailur3.call(options, _SBUError.default.PERMISSIONS_DENIED);
          return null;
        }
      }
      const response = await imagePickerModule.launchImageLibrary({
        presentationStyle: 'fullScreen',
        selectionLimit,
        mediaType: (() => {
          switch (options === null || options === void 0 ? void 0 : options.mediaType) {
            case 'photo':
              return 'photo';
            case 'video':
              return 'video';
            case 'all':
              return 'mixed';
            default:
              return 'photo';
          }
        })()
      });
      if (response.didCancel) return null;
      if (response.errorCode === 'camera_unavailable') {
        var _options$onOpenFailur4;
        options === null || options === void 0 ? void 0 : (_options$onOpenFailur4 = options.onOpenFailure) === null || _options$onOpenFailur4 === void 0 ? void 0 : _options$onOpenFailur4.call(options, _SBUError.default.DEVICE_UNAVAILABLE, new Error(response.errorMessage));
        return null;
      }
      return Promise.all((response.assets || []).slice(0, selectionLimit).map(_ref2 => {
        let {
          fileName: name,
          fileSize: size,
          type,
          uri
        } = _ref2;
        return (0, _normalizeFile.default)({
          uri,
          size,
          name,
          type
        });
      }));
    }
    async openDocument(options) {
      try {
        const {
          uri,
          size,
          name,
          type
        } = await documentPickerModule.pickSingle();
        return (0, _normalizeFile.default)({
          uri,
          size,
          name,
          type
        });
      } catch (e) {
        if (!documentPickerModule.isCancel(e) && documentPickerModule.isInProgress(e)) {
          var _options$onOpenFailur5;
          options === null || options === void 0 ? void 0 : (_options$onOpenFailur5 = options.onOpenFailure) === null || _options$onOpenFailur5 === void 0 ? void 0 : _options$onOpenFailur5.call(options, _SBUError.default.UNKNOWN, e);
        }
        return null;
      }
    }
    async save(options) {
      const hasPermission = await this.hasMediaLibraryPermission();
      if (!hasPermission) {
        const granted = await this.requestMediaLibraryPermission();
        if (!granted) throw new Error('Permission not granted');
      }
      const {
        downloadedPath,
        file
      } = await this.downloadFile(options);
      if (_reactNative.Platform.OS === 'ios') {
        if (file.type === 'image' || file.type === 'video') {
          const mediaTypeMap = {
            'image': 'photo',
            'video': 'video'
          };
          const mediaType = mediaTypeMap[file.type];
          await mediaLibraryModule.save(downloadedPath, {
            type: mediaType
          });
        }
      }
      if (_reactNative.Platform.OS === 'android') {
        const externalDirMap = {
          'file': 'downloads',
          'audio': 'audio',
          'image': 'images',
          'video': 'video'
        };
        const externalDir = externalDirMap[file.type];
        await fsModule.FileSystem.cpExternal(downloadedPath, file.name, externalDir);
      }
      return downloadedPath;
    }
  }
  return new NativeFileService();
};
var _default = createNativeFileService;
exports.default = _default;
//# sourceMappingURL=createFileService.native.js.map