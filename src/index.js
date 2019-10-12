import { useDebugValue, useEffect, useState } from 'react';
import stopMediaStream from 'stop-media-stream';

function useUserMedia(constraints) {
  const [stream, setStream] = useState();
  const [error, setError] = useState();
  const [state, setState] = useState('pending');

  useDebugValue({ error, state, stream });

  useEffect(() => {
    let canceled = false;

    setState('pending');
    navigator.mediaDevices.getUserMedia(constraints).then(
      stream => {
        if (!canceled) {
          setState('resolved');
          setStream(stream);
        }
      },
      error => {
        if (!canceled) {
          setState('rejected');
          setError(error);
        }
      }
    );

    return () => {
      canceled = true;
    };
  }, [constraints]);

  useEffect(() => () => stopMediaStream(stream), [stream]);

  return { error, state, stream };
}

export default useUserMedia;
