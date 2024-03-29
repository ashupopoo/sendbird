function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { getFileExtension, getFileType } from '@sendbird/uikit-utils';
import BaseFileMessage from './BaseFileMessage';
import ImageFileMessage from './ImageFileMessage';
import VideoFileMessage from './VideoFileMessage';
const FileMessage = props => {
  const fileType = getFileType(props.message.type || getFileExtension(props.message.name));
  if (fileType === 'image') return /*#__PURE__*/React.createElement(ImageFileMessage, props);
  if (fileType === 'video') return /*#__PURE__*/React.createElement(VideoFileMessage, props);
  return /*#__PURE__*/React.createElement(BaseFileMessage, _extends({}, props, {
    type: fileType
  }));
};
export default /*#__PURE__*/React.memo(FileMessage);
//# sourceMappingURL=index.js.map