import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { createHttpLink } from 'apollo-link-http';
// import { ApolloProvider } from '@apollo/react-hooks';
//
// const link = createHttpLink({ uri: 'https://covid19-graphql.now.sh/' });
//
// const client = new ApolloClient({
//   cache: new InMemoryCache({
//     freezeResults: true, //Works only in dev mode
//     dataIdFromObject: (obj) => obj.id,
//   }),
//   link,
// });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
