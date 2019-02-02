import { useEffect, useMemo } from 'react';
import stopMediaStream from 'stop-media-stream';
import usePromise from 'react-use-promise';

function useUserMedia(constraints) {
  const [stream, error, state] = usePromise(useMemo(
    () => navigator.mediaDevices.getUserMedia(constraints),
    [constraints]
  ));

  useEffect(() => () => stopMediaStream(stream), [stream]);

  return { error, state, stream };
}

export default useUserMedia;
