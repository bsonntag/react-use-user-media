import { useEffect } from 'react';
import stopMediaStream from 'stop-media-stream';
import usePromise from 'react-use-promise';

function useUserMedia(constraints) {
  const [stream, error] = usePromise(() => {
    return navigator.mediaDevices.getUserMedia(constraints);
  });

  useEffect(() => () => stopMediaStream(stream), [stream]);

  return { error, stream };
}

export default useUserMedia;
