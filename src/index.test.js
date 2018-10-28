import { render, wait } from 'react-testing-library';
import React from 'react';
import useUserMedia from '.';

const Test = () => {
  const { error, stream } = useUserMedia({});

  return error || stream;
};

describe('useUserMedia', () => {
  navigator.mediaDevices = navigator.mediaDevices || {};

  it('returns the user media stream', async () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.resolve('foo'));

    const app = <Test />;
    const { container, rerender } = render(app);

    rerender(app);

    await wait(() => {
      expect(container).toHaveTextContent('foo');
    });
  });

  it('returns the user media error', async () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.reject('foo'));

    const app = <Test />;
    const { container, rerender } = render(app);

    rerender(app);

    await wait(() => {
      expect(container).toHaveTextContent('foo');
    });
  });
});
