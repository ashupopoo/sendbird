import { Dimensions, PixelRatio } from 'react-native';
const {
  width,
  height
} = Dimensions.get('window');
const DESIGNED_DEVICE_WIDTH = 360;
const createScaleFactor = function () {
  let deviceWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DESIGNED_DEVICE_WIDTH;
  const ratio = Math.min(width, height) / deviceWidth;
  const rangedRatio = Math.min(Math.max(0.85, ratio), 1.25);
  return dp => PixelRatio.roundToNearestPixel(dp * rangedRatio);
};
createScaleFactor.updateScaleFactor = scaleFactor => {
  DEFAULT_SCALE_FACTOR = scaleFactor;
};
export let DEFAULT_SCALE_FACTOR = createScaleFactor();
export default createScaleFactor;
//# sourceMappingURL=createScaleFactor.js.map