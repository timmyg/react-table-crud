import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import UserDetail from './UserDetail';
import UserList from './UserList';
import React from 'react';
import { useUsers } from '../hooks/users';

const Router = () => {
  const {
    getAll: { loading, error, data },
  } = useUsers();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <UserList users={data.allUsers} />} />
        <Route
          path="/users/:email"
          render={(props) => (
            <UserDetail user={data.allUsers.find((u) => u.email === props.match.params.email)} />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
