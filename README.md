# react-use-user-media

[![CircleCI](https://circleci.com/gh/bsonntag/react-use-user-media.svg?style=svg)](https://circleci.com/gh/bsonntag/react-use-user-media)
[![Coverage Status](https://coveralls.io/repos/github/bsonntag/react-use-user-media/badge.svg?branch=master)](https://coveralls.io/github/bsonntag/react-use-user-media?branch=master)

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

This module uses React's upcoming hooks feature.
To try this out you'll also need to install the 16.7.0-alpha.0 version
of `react` and `react-dom`:

```sh
$ yarn add react@16.7.0-alpha.0 react-dom@16.7.0-alpha.0
```

## Usage

```js
import React from 'react';
import Video from '@bsonntag/react-video';
import useUserMedia from 'react-use-user-media';

function Example() {
  const { stream } = useUserMedia({ video: true });

  if (!stream) {
    return <p>Waiting...</p>;
  }

  return (
    <Video
      play
      srcObject={stream}
    />
  );
}
```

## API

```js
useUserMedia(Object): {
  error: Error,
  stream: MediaStream
}
```

Receives a [constraints object](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints)
to call [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
with and returns an object with the error and [stream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/MediaStream).

## Contributing

Please feel free to submit any issues or pull requests.

## License

MIT
