"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _stopMediaStream = _interopRequireDefault(require("stop-media-stream"));

var _reactUsePromise = _interopRequireDefault(require("react-use-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useUserMedia(constraints) {
  var _usePromise = (0, _reactUsePromise.default)(function () {
    return navigator.mediaDevices.getUserMedia(constraints);
  }),
      _usePromise2 = _slicedToArray(_usePromise, 2),
      stream = _usePromise2[0],
      error = _usePromise2[1];

  (0, _react.useEffect)(function () {
    return function () {
      return (0, _stopMediaStream.default)(stream);
    };
  }, [stream]);
  return {
    error: error,
    stream: stream
  };
}

var _default = useUserMedia;
exports.default = _default;