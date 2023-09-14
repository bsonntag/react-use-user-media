import * as React from 'react';
import { render } from 'react-dom';
import useUserMedia from '../dist';

const videoSize = { height: 480, width: 640 };
const constraints = {
  video: true
};

const Example = () => {
  const { error, state, stream } = useUserMedia(constraints);
  const ref = React.useRef();

  React.useEffect(() => {
    if (state !== 'resolved' || !stream) {
      return;
    }

    ref.current.srcObject = stream;
    ref.current.play();
  }, [state, stream]);

  if (state === 'pending') {
    return (
      <p>
        {'Waiting...'}
      </p>
    );
  }

  if (state === 'rejected') {
    return (
      <p>
        {'Error: '}
        {error.message}
      </p>
    );
  }

  return (
    <video
      ref={ref}
      style={videoSize}
    />
  );
};

render(<Example />, document.getElementById('root'));
