/* eslint-disable valid-jsdoc */
import { useDebugValue, useEffect, useReducer } from 'react';
import stopMediaStream from 'stop-media-stream';

/**
 * Reducer that handles all useUserMedia states and actions.
 */
const mediaStateReducer = (curMediaState, action) => {
  switch (action.type) {
    case 'GET':
      return { ...curMediaState, state: 'pending' };

    case 'RESPONSE':
      return { ...curMediaState, state: 'resolved', stream: action.stream };

    case 'ERROR':
      return { ...curMediaState, error: action.error, state: 'rejected' };

    default:
      throw new Error(
        `Action type ${action.type} not supported by the mediaStateReducer`
      );
  }
};

/**
 * React hook for accessing user media.
 * This hook ensures that getUserMedia is only called one time.
 *
 * @remarks Please make sure you wrap your constraint object inside a useEffect or
 * useMemo hook to prevent infinite render loops
 */
export const useUserMedia = constraints => {
  const [userMediaState, dispatchUserMedia] = useReducer(mediaStateReducer, {
    error: null,
    state: 'pending',
    stream: null
  });

  useDebugValue(userMediaState);

  useEffect(() => {
    let canceled = false;

    dispatchUserMedia({ type: 'GET' });
    navigator.mediaDevices.getUserMedia(constraints).then(
      stream => {
        if (!canceled) {
          dispatchUserMedia({ stream, type: 'RESPONSE' });
        }
      },
      error => {
        if (!canceled) {
          dispatchUserMedia({ error, type: 'ERROR' });
        }
      }
    );

    return () => {
      canceled = true;
    };
  }, [constraints]);

  useEffect(
    () => () => stopMediaStream(userMediaState.stream),
    [userMediaState.stream]
  );

  return userMediaState;
};

export default useUserMedia;
