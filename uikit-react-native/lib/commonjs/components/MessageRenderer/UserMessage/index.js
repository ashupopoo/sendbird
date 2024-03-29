"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _BaseUserMessage = _interopRequireDefault(require("./BaseUserMessage"));
var _OpenGraphUserMessage = _interopRequireDefault(require("./OpenGraphUserMessage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const UserMessage = props => {
  if (props.message.ogMetaData) {
    return /*#__PURE__*/_react.default.createElement(_OpenGraphUserMessage.default, _extends({}, props, {
      ogMetaData: props.message.ogMetaData
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_BaseUserMessage.default, props);
};
var _default = /*#__PURE__*/_react.default.memo(UserMessage);
exports.default = _default;
//# sourceMappingURL=index.js.map