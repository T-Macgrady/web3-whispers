# ReplyModal Component Specification

The `ReplyModal` component is a modal that allows the user to reply to a tweet. It is a child component of the `Tweet` component.

## Props

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `isOpen` | boolean | Determines whether the modal is open or closed. |
| `onClose` | function | Callback function to close the modal. |
| `tweet` | object | The tweet object that the user is replying to. |

## Example Usage

```jsx
import { useState } from 'react';
import { ReplyModal } from './ReplyModal';
import { Tweet } from './Tweet';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState(null);

  const handleReplyClick = (tweet) => {
    setSelectedTweet(tweet);
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedTweet(null);
    setIsOpen(false);
  };

  return (
    <>
      <Tweet tweet={tweet} onReplyClick={handleReplyClick} />
      <ReplyModal isOpen={isOpen} onClose={handleClose} tweet={selectedTweet} />
    </>
  );
}
```

## Implementation Details

The `ReplyModal` component should render a modal with a form that allows the user to compose and submit a reply to the selected tweet. The form should have the following fields:

- A text input for the user to enter their reply message.
- A button to submit the reply.

When the user submits the reply, the `onClose` callback function should be called to close the modal. The `onSubmit` event of the form should be prevented from refreshing the page.

The `ReplyModal` component should also handle the case where the user tries to submit an empty reply message. In this case, an error message should be displayed to the user.

The `ReplyModal` component should be styled to match the design of the rest of the application.