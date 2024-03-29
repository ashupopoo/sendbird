"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSafeAreaPadding = exports.useAppState = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
const edgePaddingMap = {
  left: 'paddingLeft',
  right: 'paddingRight',
  top: 'paddingTop',
  bottom: 'paddingBottom'
};
const useSafeAreaPadding = edges => {
  const safeAreaInsets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return edges.reduce((map, edge) => {
    const paddingKey = edgePaddingMap[edge];
    map[paddingKey] = safeAreaInsets[edge];
    return map;
  }, {});
};
exports.useSafeAreaPadding = useSafeAreaPadding;
const useAppState = (type, listener) => {
  const callbackRef = (0, _react.useRef)(listener);
  callbackRef.current = listener;
  (0, _react.useEffect)(() => {
    const eventListener = state => callbackRef.current(state);
    const subscriber = _reactNative.AppState.addEventListener(type, eventListener);
    return () => {
      // @ts-ignore
      if (subscriber !== null && subscriber !== void 0 && subscriber.remove) {
        subscriber.remove();
      }
      // @ts-ignore
      else if (_reactNative.AppState.removeEventListener) {
        // @ts-ignore
        _reactNative.AppState.removeEventListener(type, eventListener);
      }
    };
  }, []);
};
exports.useAppState = useAppState;
//# sourceMappingURL=react-native.js.map