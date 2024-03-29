function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import BaseUserMessage from './BaseUserMessage';
import OpenGraphUserMessage from './OpenGraphUserMessage';
const UserMessage = props => {
  if (props.message.ogMetaData) {
    return /*#__PURE__*/React.createElement(OpenGraphUserMessage, _extends({}, props, {
      ogMetaData: props.message.ogMetaData
    }));
  }
  return /*#__PURE__*/React.createElement(BaseUserMessage, props);
};
export default /*#__PURE__*/React.memo(UserMessage);
//# sourceMappingURL=index.js.map