# TweetModal Component Specification

The `TweetModal` component is responsible for rendering a modal that allows the user to create or edit a tweet. It is a child component of the `Tweet` component.

## Props

| Prop Name | Type | Description |
| --- | --- | --- |
| `isOpen` | boolean | Determines whether the modal is open or closed. |
| `onClose` | function | Callback function to be called when the modal is closed. |
| `initialValue` | string | The initial value of the tweet text input. |
| `onSubmit` | function | Callback function to be called when the tweet is submitted. |

## Usage

```jsx
import TweetModal from './TweetModal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [tweetText, setTweetText] = useState('');

  const handleSubmit = () => {
    // Handle tweet submission logic
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Create Tweet</button>
      <TweetModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialValue={tweetText}
        onSubmit={handleSubmit}
      />
    </>
  );
}
```

## Implementation Details

The `TweetModal` component uses the `Modal` component from the `react-bootstrap` library to render the modal. It contains a form with a single text input for the tweet text, and a submit button.

When the form is submitted, the `onSubmit` callback function is called with the current value of the text input as its argument.

The `TweetModal` component also includes a character counter that displays the number of characters remaining in the tweet, and disables the submit button if the tweet is too long.

## Example

![TweetModal Example](./TweetModal.png)