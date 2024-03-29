"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroupChannel = void 0;
var _react = require("react");
var _uikitUtils = require("@sendbird/uikit-utils");
const useGroupChannel = (sdk, channelUrl) => {
  const [channel, setChannel] = (0, _react.useState)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [error, setError] = (0, _react.useState)();
  (0, _uikitUtils.useAsyncEffect)(async () => {
    try {
      setChannel(await sdk.groupChannel.getChannel(channelUrl));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    channel,
    loading,
    error
  };
};
exports.useGroupChannel = useGroupChannel;
//# sourceMappingURL=useGroupChannel.js.map