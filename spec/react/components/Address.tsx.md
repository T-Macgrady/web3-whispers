# Address Component

The `Address` component is a reusable component that displays an Ethereum address with an optional label.

## Props

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes | The Ethereum address to display |
| `label` | `string` | No | An optional label to display above the address |

## Example Usage

```jsx
import Address from './Address';

function MyComponent() {
  return (
    <div>
      <Address address="0x1234567890123456789012345678901234567890" label="Owner" />
    </div>
  );
}
```

## Implementation Details

The `Address` component uses the `web3-utils` library to format the Ethereum address with the `toChecksumAddress` function. The label is displayed using a `div` element with a class of `label`, and the address is displayed using a `div` element with a class of `address`. The `address` element has a `title` attribute with the full Ethereum address, which is displayed when the user hovers over the address.