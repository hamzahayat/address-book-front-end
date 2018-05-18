// Import Apollo Client Objects
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

// Import React Objects
import React from 'react';
import ReactDOM from 'react-dom';

// Import Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';

// Initialize Http Link Variable
const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });

// Initialize Middleware
const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refreshToken'),
  },
}));

// Initialize Afterware
const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();

  // Check if Header is not empty and refresh tokens
  if (headers) {
    const token = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');

    if (token) {
      localStorage.setItem('token', token);
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  return forward(operation);
});

// Concatenate Afterware and Middleware
const link = afterwareLink.concat(middlewareLink.concat(httpLink));

// Declare Apollo Client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// Initialize App Componenet and pass Client To Apollo
const App = (
  <ApolloProvider client={client}>
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
