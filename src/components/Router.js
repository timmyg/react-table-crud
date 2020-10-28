import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import UserDetail from './UserDetail';
import UserList from './UserList';
import React from 'react';

const Router = (props) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <UserList users={props.users} />} />
      <Route path="/user/:userId" component={UserDetail} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
