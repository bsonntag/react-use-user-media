import { render } from 'react-dom';
import React, { useEffect, useRef } from 'react';
import useUserMedia from '../dist';

window.React = React;

const videoSize = { height: 480, width: 640 };
const constraints = {
  video: true,
};

const Example = () => {
  const { error, state, stream } = useUserMedia(constraints);
  const ref = useRef();

  useEffect(() => {
    if (state !== 'resolved' || !stream) {
      return;
    }

    ref.current.srcObject = stream;
    ref.current.play();
  }, [state, stream]);

  if (state === 'pending') {
    return <p>{'Waiting...'}</p>;
  }

  if (state === 'rejected') {
    return (
      <p>
        {'Error: '}
        {error.message}
      </p>
    );
  }

  return <video ref={ref} style={videoSize} />;
};

render(<Example />, document.getElementById('root'));
