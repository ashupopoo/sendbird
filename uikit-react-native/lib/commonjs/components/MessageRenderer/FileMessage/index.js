"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _BaseFileMessage = _interopRequireDefault(require("./BaseFileMessage"));
var _ImageFileMessage = _interopRequireDefault(require("./ImageFileMessage"));
var _VideoFileMessage = _interopRequireDefault(require("./VideoFileMessage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const FileMessage = props => {
  const fileType = (0, _uikitUtils.getFileType)(props.message.type || (0, _uikitUtils.getFileExtension)(props.message.name));
  if (fileType === 'image') return /*#__PURE__*/_react.default.createElement(_ImageFileMessage.default, props);
  if (fileType === 'video') return /*#__PURE__*/_react.default.createElement(_VideoFileMessage.default, props);
  return /*#__PURE__*/_react.default.createElement(_BaseFileMessage.default, _extends({}, props, {
    type: fileType
  }));
};
var _default = /*#__PURE__*/_react.default.memo(FileMessage);
exports.default = _default;
//# sourceMappingURL=index.js.map