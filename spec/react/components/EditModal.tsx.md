# EditModal Component Specification

The `EditModal` component is responsible for rendering a modal that allows the user to edit a tweet. It is a child component of the `Tweet` component.

## Props

The `EditModal` component accepts the following props:

| Prop name | Type | Required | Description |
| --- | --- | --- | --- |
| `isOpen` | boolean | Yes | Determines whether the modal is open or closed |
| `onClose` | function | Yes | Callback function to close the modal |
| `tweet` | object | Yes | The tweet object to be edited |
| `onEdit` | function | Yes | Callback function to handle the edit of the tweet |

## Usage

```jsx
<EditModal
  isOpen={isOpen}
  onClose={handleClose}
  tweet={tweet}
  onEdit={handleEdit}
/>
```

## Implementation Details

The `EditModal` component uses the `Modal` component from the `react-bootstrap` library to render the modal. It renders a form with an input field for the tweet content and a submit button.

When the form is submitted, the `onEdit` callback function is called with the updated tweet content.

## Example

```jsx
import { useState } from 'react';
import { EditModal } from './components';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tweet, setTweet] = useState({ id: 1, content: 'Hello World' });

  const handleClose = () => setIsOpen(false);

  const handleEdit = (content) => {
    setTweet({ ...tweet, content });
    handleClose();
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Edit Tweet</button>
      <EditModal isOpen={isOpen} onClose={handleClose} tweet={tweet} onEdit={handleEdit} />
    </>
  );
}
```