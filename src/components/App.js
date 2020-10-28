import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import env from '../env';
import Router from './Router';

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

// deleteUsers = (users) => {
//   // 1. Take a copy of the existing state
//   const fishes = { ...this.state.fishes };
//   // 2. Add our new fish to that fishes variable
//   fishes[`fish${Date.now()}`] = fish;
//   // 3. Set the new fishes object to state
//   this.setState({ fishes });
// };

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

export default Root;
