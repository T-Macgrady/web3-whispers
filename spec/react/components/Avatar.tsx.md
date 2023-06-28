# Avatar Component Specification

The `Avatar` component is responsible for rendering a user's profile picture or avatar. It is used in various parts of the application, such as the `Tweet` component and the `Nav` component.

## Props

| Prop name | Type   | Required | Description                                                                 |
| --------- | ------ | -------- | --------------------------------------------------------------------------- |
| src       | string | Yes      | The URL of the image to be displayed as the avatar.                          |
| alt       | string | No       | The alternative text to be displayed if the image fails to load.            |
| size      | number | No       | The size of the avatar in pixels. Defaults to 40px if not specified.         |
| className | string | No       | Additional CSS class name(s) to be applied to the component for styling.     |

## Example Usage

```jsx
import Avatar from './Avatar';

function UserProfile({ user }) {
  return (
    <div>
      <Avatar src={user.avatarUrl} alt={user.name} size={60} className="profile-avatar" />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
}
```