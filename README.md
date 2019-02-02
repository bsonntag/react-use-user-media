# react-use-user-media

[![CircleCI](https://circleci.com/gh/bsonntag/react-use-user-media.svg?style=svg)](https://circleci.com/gh/bsonntag/react-use-user-media)
[![Coverage Status](https://coveralls.io/repos/github/bsonntag/react-use-user-media/badge.svg?branch=master)](https://coveralls.io/github/bsonntag/react-use-user-media?branch=master)

React hook for accessing user media.

## Disclaimer

This module uses the upcoming [React Hooks API Proposal](https://reactjs.org/docs/hooks-intro.html)
which is **subject to change** until released to a final version.

This means that the API of this module is also subject to change.
Please **don't** use it on a production application.

## Installation

Using npm:

```sh
$ npm install --save react-use-user-media
```

Using yarn:

```sh
$ yarn add react-use-user-media
```

Since this module uses React's upcoming Hooks feature,
to try this out you'll need to install the `16.8.0-alpha.1` version
of `react` and `react-dom`:

```sh
$ yarn add react@16.8.0-alpha.1 react-dom@16.8.0-alpha.1
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
