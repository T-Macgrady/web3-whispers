# Tweet Component

The `Tweet` component is responsible for rendering a single tweet. It receives the following props:

## Props

| Name | Type | Description |
| --- | --- | --- |
| `tweet` | object | The tweet object to be rendered. |
| `onReply` | function | A callback function to be called when the user clicks the reply button. |
| `onDelete` | function | A callback function to be called when the user clicks the delete button. |
| `onEdit` | function | A callback function to be called when the user clicks the edit button. |

## Example Usage

```jsx
import React from 'react';
import Tweet from './Tweet';

const tweet = {
  id: 1,
  author: 'John Doe',
  content: 'This is a tweet!',
  timestamp: '2022-01-01T00:00:00.000Z',
};

function App() {
  const handleReply = () => {
    console.log('Reply clicked!');
  };

  const handleDelete = () => {
    console.log('Delete clicked!');
  };

  const handleEdit = () => {
    console.log('Edit clicked!');
  };

  return (
    <Tweet
      tweet={tweet}
      onReply={handleReply}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
}

export default App;
```