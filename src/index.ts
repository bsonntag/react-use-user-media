import { useDebugValue, useEffect, useReducer } from 'react';
import stopMediaStream from 'stop-media-stream';

export interface UserMediaState {
  error: MediaError | null;
  state: string;
  stream: MediaStream | undefined;
}

interface GetUserMedia {
  type: 'GET';
}
interface UserMediaResponse {
  type: 'RESPONSE';
  stream: MediaStream;
}
interface UserMediaError {
  type: 'ERROR';
  error: MediaError;
}
type MediaActions = GetUserMedia | UserMediaResponse | UserMediaError;

/**
 * Reducer that handles all useUserMedia states and actions.
 */
const mediaStateReducer = (
  curMediaState: UserMediaState,
  action: MediaActions
) => {
  switch (action.type) {
    case 'RESPONSE':
      return { ...curMediaState, state: 'resolved', stream: action.stream };
    case 'ERROR':
      return { ...curMediaState, error: action.error, state: 'rejected' };
    default:
      return { ...curMediaState };
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
export const useUserMedia = (
  constraints: MediaStreamConstraints
): UserMediaState => {
  const [userMediaState, dispatchUserMedia] = useReducer(mediaStateReducer, {
    error: null,
    state: 'pending',
    stream: undefined,
  });

  useDebugValue(userMediaState);

  useEffect(() => {
    let canceled = false;

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

  useEffect(() => () => stopMediaStream(userMediaState.stream), [
    userMediaState.stream,
  ]);

  return userMediaState;
};

export default useUserMedia;
