const EXTENSION_MIME_MAP = {
  // Image
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'webp': 'image/webp',
  'svg': 'image/svg+xml',
  // Video
  '3gp': 'video/3gpp',
  'mp4': 'video/mp4',
  'mpeg': 'video/mpeg',
  'ogv': 'video/ogg',
  'video/quicktime': 'mov',
  'webm': 'video/webm',
  'avi': 'video/x-msvideo',
  // Audio
  'aac': 'audio/aac',
  'mid': 'audio/midi',
  'mp3': 'audio/mpeg',
  'ogg': 'audio/ogg',
  'wav': 'audio/wav',
  'weba': 'audio/webm',
  // Files
  'txt': 'text/plain',
  'pdf': 'application/pdf',
  'doc': 'application/msword',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'xls': 'application/vnd.ms-excel',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'ppt': 'application/vnd.ms-powerpoint',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'zip': 'application/zip',
  'json': 'application/json',
  'gzip': 'application/x-gzip'
};
export const imageExtRegex = /jpeg|jpg|png|webp|gif/i;
export const audioExtRegex = /3gp|aac|aax|act|aiff|flac|gsm|m4a|m4b|m4p|tta|wma|mp3|webm|wav/i;
export const videoExtRegex = /mov|vod|mp4|avi/i;
export const getFileType = extOrType => {
  if (extOrType.indexOf('/') > -1) {
    const type = extOrType.split('/')[0];
    if (type === 'video') return 'video';
    if (type === 'audio') return 'audio';
    if (type === 'image') return 'image';
    return 'file';
  }
  if (extOrType.match(imageExtRegex)) return 'image';
  if (extOrType.match(audioExtRegex)) return 'audio';
  if (extOrType.match(videoExtRegex)) return 'video';
  return 'file';
};

/**
 * Calculates the downscaled size of an image while preserving its aspect ratio.
 *
 * @param {Object} origin - The original size object with `width` and `height` properties.
 * @param {Object} resizing - The resizing object with optional `width` and `height` properties.
 * @returns {Object} - A new size object with the downscaled `width` and `height` properties.
 * @example
 * ```ts
 *   getDownscaleSize({ width: 1200, height: 800 }, { width: 600 }); // returns { width: 600, height: 400 }
 * ```
 */

export function getDownscaleSize(origin, resizing) {
  let ratio;
  const maxWidth = resizing.width || origin.width,
    maxHeight = resizing.height || origin.height;
  if (origin.width <= maxWidth && origin.height <= maxHeight) {
    ratio = 1;
  } else if (origin.width > maxWidth && origin.height <= maxHeight) {
    ratio = maxWidth / origin.width;
  } else if (origin.width <= maxWidth && origin.height > maxHeight) {
    ratio = maxHeight / origin.height;
  } else {
    ratio = Math.min(maxWidth / origin.width, maxHeight / origin.height);
  }
  return {
    width: origin.width * ratio,
    height: origin.height * ratio
  };
}

/**
 * Normalize a file name by ensuring it has the given extension, if it doesn't already.
 *
 * @param {string} fileName - The file name to normalize.
 * @param {string} extension - The desired extension, without a leading period.
 * @returns {string} - The normalized file name, with the extension.
 */
export function normalizeFileName(fileName, extension) {
  if (!extension) return fileName;

  // .extension
  let _extension = extension.toLowerCase();
  if (_extension.indexOf('.') !== 0) {
    _extension = '.' + _extension;
  }

  // filename.extension | filename
  const _filename = fileName.toLowerCase();
  const hasExtension = _filename.lastIndexOf(_extension) === _filename.length - _extension.length;
  if (!hasExtension) {
    // filename.extension
    return fileName + _extension;
  } else {
    // filename.extension
    return fileName;
  }
}

/**
 * Parses a MIME type string into its components.
 *
 * @param mimeType - The MIME type string to parse.
 * @returns An object containing the type, subtype, and parameters of the MIME type.
 */

export function parseMimeType(mimeType) {
  const [fullType, ...parts] = mimeType.split(';');
  const [type, subtype] = fullType.split('/');
  const parameters = {};
  for (const part of parts) {
    const [name, value] = part.trim().split('=');
    parameters[name] = value;
  }
  return {
    type,
    subtype,
    parameters
  };
}

/**
 * Returns the file extension based on the MIME type.
 *
 * @param {string | null | undefined} mimeType - The MIME type to look up.
 * @returns {string} - The file extension for the given MIME type, or an empty string if no matching file extension was found.
 */
export function getFileExtensionFromMime(mimeType) {
  if (!mimeType) return '';
  const MIME_EXTENSION_MAP = Object.entries(EXTENSION_MIME_MAP).reduce((acc, _ref) => {
    let [key, value] = _ref;
    acc[value] = key;
    return acc;
  }, {});
  return MIME_EXTENSION_MAP[mimeType.toLowerCase()] || '';
}

/**
 * Returns the MIME type based on the file extension.
 *
 * @param {string | null | undefined} ext - The file extension to look up.
 * @returns {string} - The MIME type for the given file extension, or an empty string if no matching MIME type was found.
 */
export function getMimeFromFileExtension(ext) {
  if (!ext) return '';
  return EXTENSION_MIME_MAP[ext.toLowerCase()] || '';
}

/**
 * Returns the file extension of a file path.
 *
 * @param {string} filePath - The file path to extract the extension from.
 * @returns {string} - The file extension, or an empty string if the file path does not have an extension.
 */
export function getFileExtension(filePath) {
  const pathWithoutParams = filePath.split('?')[0];
  const idx = pathWithoutParams.lastIndexOf('.');
  if (idx === -1) return '';
  const result = pathWithoutParams.slice(idx - pathWithoutParams.length).toLowerCase();
  if (result === '.') return '';else return result;
}
export function getFileExtensionFromUri(uri) {
  return fetch(uri).then(response => response.headers.get('content-type'));
}
export function isImage(filePath, mimeType) {
  const type = getFileType(mimeType || getFileExtension(filePath));
  return type === 'image';
}
export function shouldCompressImage(mime) {
  let compressionEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const extension = getFileExtensionFromMime(mime);
  return Boolean(extension.match(/jpg|jpeg|png/i) && compressionEnabled);
}
//# sourceMappingURL=file.js.map