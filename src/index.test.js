import { render, wait } from 'react-testing-library';
import React from 'react';
import useUserMedia from '.';

const constraints = {};

const Test = () => {
  const { error, state, stream } = useUserMedia(constraints);

  return (
    <>
      <p>{state}</p>
      <p>{error || stream}</p>
    </>
  );
};

describe('useUserMedia', () => {
  navigator.mediaDevices = navigator.mediaDevices || {};

  it('should return a `pending` state while the getUserMedia promise is pending', () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.resolve('foo'));

    const app = <Test />;
    const { container } = render(app);

    expect(container).toHaveTextContent('pending');
  });

  it('should return the user media stream', async () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.resolve('foo'));

    const app = <Test />;
    const { container, rerender } = render(app);

    rerender(app);

    await wait(() => {
      expect(container).toHaveTextContent('resolved');
      expect(container).toHaveTextContent('foo');
    });
  });

  it('should return the user media error', async () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.reject('foo'));

    const app = <Test />;
    const { container, rerender } = render(app);

    rerender(app);

    await wait(() => {
      expect(container).toHaveTextContent('rejected');
      expect(container).toHaveTextContent('foo');
    });
  });
});
