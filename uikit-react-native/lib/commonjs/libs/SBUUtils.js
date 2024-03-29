"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
class SBUUtils {
  static openSettings() {
    _reactNative.Linking.openSettings().catch(() => {
      if (_reactNative.Platform.OS === 'ios') _reactNative.Linking.openURL('App-Prefs:root');
    });
  }
  static openURL(url) {
    const targetUrl = url.startsWith('http') ? url : 'https://' + url;
    _reactNative.Linking.openURL(targetUrl).catch(err => _uikitUtils.Logger.warn('Cannot open url', err));
  }
  static getImageSize(uri) {
    return new Promise((resolve, reject) => {
      _reactNative.Image.getSize(uri, (width, height) => {
        resolve({
          width,
          height
        });
      }, error => {
        reject(error);
      });
    });
  }
  static async safeRun(callback) {
    try {
      await callback();
    } catch (e) {}
  }
}
exports.default = SBUUtils;
//# sourceMappingURL=SBUUtils.js.map