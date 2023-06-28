# TweetList Component

The `TweetList` component is responsible for rendering a list of tweets. It receives an array of tweet objects as a prop and maps over them to render individual `Tweet` components.

## Props

| Prop name | Type     | Required | Description                                      |
| --------- | -------- | -------- | ------------------------------------------------ |
| tweets    | `Array`  | Yes      | An array of tweet objects to be rendered         |
| loading   | `bool`   | No       | A boolean indicating whether tweets are loading |
| error     | `string` | No       | An error message to be displayed if fetch fails  |

## Example Usage

```jsx
import React from 'react';
import TweetList from './TweetList';

const tweets = [
  {
    id: 1,
    author: 'Alice',
    content: 'Hello World!',
    timestamp: '2022-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    author: 'Bob',
    content: 'Hi there!',
    timestamp: '2022-01-01T00:01:00.000Z',
  },
];

function App() {
  return (
    <div>
      <TweetList tweets={tweets} />
    </div>
  );
}

export default App;
```