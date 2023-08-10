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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Reducer that handles all useUserMedia states and actions.
 */
var mediaStateReducer = function mediaStateReducer(curMediaState, action) {
  switch (action.type) {
    case 'RESPONSE':
      return _objectSpread(_objectSpread({}, curMediaState), {}, {
        state: 'resolved',
        stream: action.stream
      });

    case 'ERROR':
      return _objectSpread(_objectSpread({}, curMediaState), {}, {
        error: action.error,
        state: 'rejected'
      });

    default:
      return _objectSpread({}, curMediaState);
  }
};
/**
 * React hook for accessing user media.
 * @param constraints - The media stream constraints.
 * @returns The user media state object.
 *
 * @remarks Please make sure you wrap your constraint object inside a useEffect or
 * useMemo hook to prevent infinite render loops.
 */


function useUserMedia(constraints) {
  var _useReducer = (0, _react.useReducer)(mediaStateReducer, {
    error: null,
    state: 'pending',
    stream: undefined
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      userMediaState = _useReducer2[0],
      dispatchUserMedia = _useReducer2[1];

  (0, _react.useDebugValue)(userMediaState);
  (0, _react.useEffect)(function () {
    var canceled = false;
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      if (!canceled) {
        dispatchUserMedia({
          stream: stream,
          type: 'RESPONSE'
        });
      }
    }, function (error) {
      if (!canceled) {
        dispatchUserMedia({
          error: error,
          type: 'ERROR'
        });
      }
    });
    return function () {
      canceled = true;
    };
  }, [constraints]);
  (0, _react.useEffect)(function () {
    return function () {
      return (0, _stopMediaStream["default"])(userMediaState.stream);
    };
  }, [userMediaState.stream]);
  return userMediaState;
}

var _default = useUserMedia;
exports["default"] = _default;