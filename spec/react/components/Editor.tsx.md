# Editor Component

The `Editor` component is responsible for rendering a text input field and a button to submit the input. It is used for creating new tweets.

## Props

| Name | Type | Description |
| --- | --- | --- |
| `onSubmit` | `function` | A callback function to be called when the submit button is clicked. It should take one argument, the text input value. |

## Example Usage

```jsx
import React from 'react';
import Editor from './Editor';

function NewTweet() {
  const handleSubmit = (text) => {
    // Handle submitting the new tweet
  };

  return (
    <div>
      <h2>New Tweet</h2>
      <Editor onSubmit={handleSubmit} />
    </div>
  );
}
```

## Implementation Details

The `Editor` component uses the `useState` hook to manage the text input value. When the submit button is clicked, the `onSubmit` callback is called with the current value of the text input. The text input is cleared after submission.

The `Editor` component is used in the `TweetModal` component to allow users to create new tweets.