import { renderHook } from '@testing-library/react-hooks';
import useUserMedia from '.';

describe('useUserMedia', () => {
  const constraints = {};

  navigator.mediaDevices = navigator.mediaDevices || {};

  it('should return a `pending` state while the getUserMedia promise is pending', () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => new Promise(() => {}));

    const { result } = renderHook(() => useUserMedia(constraints));

    expect(result.current.state).toBe('pending');
  });

  it('should return the user media stream', async () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.resolve('foo'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useUserMedia(constraints)
    );

    await waitForNextUpdate();

    expect(result.current.stream).toBe('foo');
  });

  it('should return a `resolved` state when the getUserMedia promise is resolved', async () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.resolve('foo'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useUserMedia(constraints)
    );

    await waitForNextUpdate();

    expect(result.current.state).toBe('resolved');
  });

  it('should return the user media error', async () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.reject('foo'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useUserMedia(constraints)
    );

    await waitForNextUpdate();

    expect(result.current.error).toBe('foo');
  });

  it('should return a `rejected` state when the getUserMedia promise is rejected', async () => {
    navigator.mediaDevices.getUserMedia = jest.fn(() => Promise.reject('foo'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useUserMedia(constraints)
    );

    await waitForNextUpdate();

    expect(result.current.state).toBe('rejected');
  });
});
