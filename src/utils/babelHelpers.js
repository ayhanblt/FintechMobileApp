/**
 * Helper functions that are normally provided by Babel
 * This is a workaround for _interopRequireDefault error on web
 */

export function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

export function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}