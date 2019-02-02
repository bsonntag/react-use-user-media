import { render } from 'react-dom';
import React from 'react';
import Video from '@bsonntag/react-video';
import useUserMedia from '../src';

const constraints = { video: true };

const Example = () => {
  const { error, state, stream } = useUserMedia(constraints);

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
    <Video
      play
      srcObject={stream}
    />
  );
};

render(<Example />, document.getElementById('root'));
