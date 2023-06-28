# AppProvider Component

The `AppProvider` component is a higher-order component that provides the `web3` context to all the child components. It uses the `useWeb3React` hook from the `@web3-react/core` package to get the `web3` context.

## Dependencies

This component depends on the following packages:

- `@web3-react/core`

## Usage

To use the `AppProvider` component, wrap your app with it:

```jsx
import { AppProvider } from './components/AppProvider';

function App() {
  return (
    <AppProvider>
      {/* Your app code here */}
    </AppProvider>
  );
}
```

## Props

The `AppProvider` component does not accept any props.

## Example

Here is an example of how to use the `AppProvider` component:

```jsx
import { AppProvider } from './components/AppProvider';
import { MyComponent } from './components/MyComponent';

function App() {
  return (
    <AppProvider>
      <MyComponent />
    </AppProvider>
  );
}
```

In the `MyComponent` component, you can access the `web3` context using the `useWeb3React` hook:

```jsx
import { useWeb3React } from '@web3-react/core';

export function MyComponent() {
  const { account, library } = useWeb3React();

  // Your component code here
}
```