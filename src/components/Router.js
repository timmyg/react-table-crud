import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import NotFound from './NotFound';
import UserDetail from './UserDetail';
import UserList from './UserList';
import React from 'react';

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

const Router = (props) => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  console.log({ loading, error, data });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  console.log(props);
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <UserList
              users={data.allUsers}
              deleteSelectedUsers={props.deleteSelectedUsers}
              userEmailsSelected={props.userEmailsSelected}
              handleSelectedUser={props.handleSelectedUser}
            />
          )}
        />
        <Route path="/user/:userId" component={UserDetail} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
