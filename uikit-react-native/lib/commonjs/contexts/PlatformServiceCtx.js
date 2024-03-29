"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformServiceProvider = exports.PlatformServiceContext = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PlatformServiceContext = /*#__PURE__*/_react.default.createContext(null);
exports.PlatformServiceContext = PlatformServiceContext;
const PlatformServiceProvider = _ref => {
  let {
    children,
    fileService,
    clipboardService,
    notificationService,
    mediaService
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(PlatformServiceContext.Provider, {
    value: {
      fileService,
      clipboardService,
      notificationService,
      mediaService
    }
  }, children);
};
exports.PlatformServiceProvider = PlatformServiceProvider;
//# sourceMappingURL=PlatformServiceCtx.js.map