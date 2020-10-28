import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import env from './env';
import Router from './components/Router';
// import App from './components/app';

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: (operation) => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      },
    });
  },
});

const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails) {
      email
      name
      role
    }
  }
`;

// const UPDATE_USERS_MUTATION = gql`
// mutation UpdateUser($emails: [ID]!) {
//   updateUser(type: $type) {
//     email
//     name
//     role
//   }
// }
// `;

const App = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  // const [deleteUsers, { data }]  = useMutation(DELETE_USER_MUTATION);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return <Router users={data.allUsers} />;
};

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
