import { render } from 'react-dom';
import React from 'react';
import Video from '@bsonntag/react-video';
import useUserMedia from '../src';

const Example = () => {
  const { stream } = useUserMedia({ video: true });

  if (!stream) {
    return (
      <p>
        {'Waiting...'}
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
