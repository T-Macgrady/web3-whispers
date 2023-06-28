# Controls Component Specification

The `Controls` component is responsible for rendering the tweet controls, such as the like and reply buttons.

## Props

| Name | Type | Description |
| --- | --- | --- |
| `tweet` | `Tweet` object | The tweet object to which the controls belong |
| `onLike` | `function` | Callback function to handle the like button click event |
| `onReply` | `function` | Callback function to handle the reply button click event |

## Example Usage

```jsx
import { Controls } from './Controls';

function Tweet({ tweet }) {
  const handleLike = () => {
    // handle like event
  };

  const handleReply = () => {
    // handle reply event
  };

  return (
    <div>
      <p>{tweet.text}</p>
      <Controls tweet={tweet} onLike={handleLike} onReply={handleReply} />
    </div>
  );
}
```

## Implementation Details

The `Controls` component renders two buttons: a like button and a reply button. The like button displays the number of likes the tweet has received, and the reply button displays the number of replies the tweet has received.

The `Controls` component receives the tweet object as a prop, which contains the number of likes and replies. The `onLike` and `onReply` props are callback functions that are called when the corresponding button is clicked.

The `Controls` component uses the `Avatar` component to display the user's avatar next to the tweet controls.

## Dependencies

The `Controls` component depends on the following components:

- `Avatar` component (located at `react/components/Avatar.tsx`)