"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroupChannelMessages = void 0;
var _uikitUtils = require("@sendbird/uikit-utils");
var _useGroupChannelMessagesWithCollection = require("./useGroupChannelMessagesWithCollection");
var _useGroupChannelMessagesWithQuery = require("./useGroupChannelMessagesWithQuery");
const useGroupChannelMessages = (sdk, channel, userId, options) => {
  if (sdk.isCacheEnabled || options !== null && options !== void 0 && options.enableCollectionWithoutLocalCache) {
    if (options !== null && options !== void 0 && options.queryCreator) _uikitUtils.Logger.warn('`queryCreator` is ignored, please use `collectionCreator` instead.');
    return (0, _useGroupChannelMessagesWithCollection.useGroupChannelMessagesWithCollection)(sdk, channel, userId, options);
  } else {
    return (0, _useGroupChannelMessagesWithQuery.useGroupChannelMessagesWithQuery)(sdk, channel, userId, options);
  }
};
exports.useGroupChannelMessages = useGroupChannelMessages;
//# sourceMappingURL=index.js.map