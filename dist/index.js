"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _stopMediaStream = _interopRequireDefault(require("stop-media-stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useUserMedia(constraints) {
  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      stream = _useState2[0],
      setStream = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = (0, _react.useState)('pending'),
      _useState6 = _slicedToArray(_useState5, 2),
      state = _useState6[0],
      setState = _useState6[1];

  (0, _react.useDebugValue)({
    error: error,
    state: state,
    stream: stream
  });
  (0, _react.useEffect)(function () {
    var canceled = false;
    setState('pending');
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      if (!canceled) {
        setState('resolved');
        setStream(stream);
      }
    }, function (error) {
      if (!canceled) {
        setState('rejected');
        setError(error);
      }
    });
    return function () {
      canceled = true;
    };
  }, [constraints]);
  (0, _react.useEffect)(function () {
    return function () {
      return (0, _stopMediaStream["default"])(stream);
    };
  }, [stream]);
  return {
    error: error,
    state: state,
    stream: stream
  };
}

var _default = useUserMedia;
exports["default"] = _default;