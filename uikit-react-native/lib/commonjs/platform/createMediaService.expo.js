"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _SBUUtils = _interopRequireDefault(require("../libs/SBUUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const createExpoMediaService = _ref => {
  let {
    avModule,
    thumbnailModule,
    imageManipulator,
    fsModule
  } = _ref;
  return {
    VideoComponent(_ref2) {
      let {
        source,
        resizeMode,
        onLoad,
        ...props
      } = _ref2;
      // FIXME: type error https://github.com/expo/expo/issues/17101
      // @ts-ignore
      return /*#__PURE__*/_react.default.createElement(avModule.Video, _extends({}, props, {
        source: source,
        resizeMode: resizeMode,
        onLoad: onLoad,
        useNativeControls: true
      }));
    },
    async getVideoThumbnail(_ref3) {
      let {
        url,
        quality,
        timeMills
      } = _ref3;
      try {
        const {
          uri
        } = await thumbnailModule.getThumbnailAsync(url, {
          quality,
          time: timeMills
        });
        return {
          path: uri
        };
      } catch {
        return null;
      }
    },
    async compressImage(_ref4) {
      let {
        maxWidth,
        maxHeight,
        compressionRate = 1,
        uri
      } = _ref4;
      const originSize = await _SBUUtils.default.getImageSize(uri);
      const resizingSize = (0, _uikitUtils.getDownscaleSize)(originSize, {
        width: maxWidth,
        height: maxHeight
      });
      const {
        uri: compressedURI
      } = await imageManipulator.manipulateAsync(uri, [{
        resize: resizingSize
      }], {
        compress: Math.min(Math.max(0, compressionRate), 1)
      });
      const {
        size = 0
      } = await fsModule.getInfoAsync(uri);
      return {
        uri: compressedURI,
        size
      };
    }
  };
};
var _default = createExpoMediaService;
exports.default = _default;
//# sourceMappingURL=createMediaService.expo.js.map