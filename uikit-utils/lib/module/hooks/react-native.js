import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const edgePaddingMap = {
  left: 'paddingLeft',
  right: 'paddingRight',
  top: 'paddingTop',
  bottom: 'paddingBottom'
};
export const useSafeAreaPadding = edges => {
  const safeAreaInsets = useSafeAreaInsets();
  return edges.reduce((map, edge) => {
    const paddingKey = edgePaddingMap[edge];
    map[paddingKey] = safeAreaInsets[edge];
    return map;
  }, {});
};
export const useAppState = (type, listener) => {
  const callbackRef = useRef(listener);
  callbackRef.current = listener;
  useEffect(() => {
    const eventListener = state => callbackRef.current(state);
    const subscriber = AppState.addEventListener(type, eventListener);
    return () => {
      // @ts-ignore
      if (subscriber !== null && subscriber !== void 0 && subscriber.remove) {
        subscriber.remove();
      }
      // @ts-ignore
      else if (AppState.removeEventListener) {
        // @ts-ignore
        AppState.removeEventListener(type, eventListener);
      }
    };
  }, []);
};
//# sourceMappingURL=react-native.js.map