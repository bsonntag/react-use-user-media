# react-use-user-media

[![CircleCI](https://circleci.com/gh/bsonntag/react-use-user-media.svg?style=svg)](https://circleci.com/gh/bsonntag/react-use-user-media)

React hook for accessing user media.

## Installation

Using npm:

```sh
$ npm install --save react-use-user-media
```

Using yarn:

```sh
$ yarn add react-use-user-media
```

Since this module uses React Hooks, to try this out you'll need to install at least
the `16.8.0` version of `react` and `react-dom`:

```sh
$ yarn add react@^16.8.0 react-dom@^16.8.0
```

## Usage

```js
import React, { useEffect, useRef } from 'react';
import useUserMedia from 'react-use-user-media';

const constraints = { video: true };

function Example() {
  const { state, stream } = useUserMedia(constraints);
  const ref = useRef();

  useEffect(() => {
    if (state !== 'resolved' || !stream) {
      return;
    }

    ref.current.srcObject = stream;
    ref.current.play();
  }, [state, stream]);

  if (state === 'pending') {
    return <p>Waiting...</p>;
  }

  if (state === 'rejected') {
    return <p>Error: {error.message}</p>;
  }

  return <video ref={ref} />;
}
```

## API

```js
useUserMedia(Object): {
  error: Error,
  state: 'pending' | 'resolved' | 'rejected',
  stream: MediaStream
}
```

Receives a [constraints object](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints)
to call [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
with and returns an object with the [stream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/MediaStream),
the error and the state.

**Note**: When the `constraints` change a new media stream will be requested,
so make sure you don't create a new `constraints` object on every render.

## Contributing

Please feel free to submit any issues or pull requests.

## License

MIT
