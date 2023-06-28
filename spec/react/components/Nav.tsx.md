# Nav Component Specification

The `Nav` component is responsible for rendering the navigation bar of the application. It should contain links to various pages of the application, such as the home page, user profile page, and settings page.

## Props

The `Nav` component accepts the following props:

| Prop name | Type | Required | Description |
| --- | --- | --- | --- |
| `activePage` | string | Yes | The name of the currently active page. This is used to highlight the corresponding link in the navigation bar. |
| `onPageChange` | function | Yes | A callback function that is called when the user clicks on a link in the navigation bar. It should accept a string parameter that represents the name of the new active page. |

## Example Usage

```jsx
import Nav from './Nav';

function App() {
  const [activePage, setActivePage] = useState('home');

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  return (
    <div>
      <Nav activePage={activePage} onPageChange={handlePageChange} />
      {/* rest of the app */}
    </div>
  );
}
```

## Implementation Details

The `Nav` component should render a `ul` element containing `li` elements for each link in the navigation bar. Each `li` element should contain an `a` element with the appropriate `href` attribute and text content.

The `activePage` prop should be used to add a `class` attribute to the corresponding `li` element, which can be used to highlight the active link using CSS.

The `onPageChange` prop should be used to add an `onClick` event listener to each `a` element, which calls the `onPageChange` callback with the name of the clicked page.

## Dependencies

The `Nav` component depends on the following components:

- `Address` (located in `react/components/Address.tsx`)
- `Avatar` (located in `react/components/Avatar.tsx`)
- `Controls` (located in `react/components/Controls.tsx`)
- `Layout` (located in `react/components/Layout.tsx`)
- `TweetModal` (located in `react/components/TweetModal.tsx`)