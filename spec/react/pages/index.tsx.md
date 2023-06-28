# Index Page

The `index.tsx` file is the main entry point for the web3 app. It renders the `AppProvider` component and sets up the routing for the different pages of the app.

## Dependencies

This file depends on the following components:

- `AppProvider.tsx`
- `Layout.tsx`

## Code

```tsx
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppProvider } from '../components/AppProvider';
import { Layout } from '../components/Layout';
import { TweetList } from '../components/TweetList';
import { EditModal } from '../components/EditModal';
import { ReplyModal } from '../components/ReplyModal';
import { NotFound } from '../components/NotFound';

export const IndexPage: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={TweetList} />
            <Route exact path="/edit/:id" component={EditModal} />
            <Route exact path="/reply/:id" component={ReplyModal} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </AppProvider>
  );
};
```

## Props

This component does not receive any props.

## Usage

To use this component, import it and render it:

```tsx
import React from 'react';
import { IndexPage } from './pages/IndexPage';

const App: React.FC = () => {
  return <IndexPage />;
};

export default App;
```