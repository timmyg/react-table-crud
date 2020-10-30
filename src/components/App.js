import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
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

class App extends React.Component {
  state = {
    userEmailsSelected: [],
  };

  handleSelectedUser = (email, isSelected) => {
    let userEmailsSelected = [...this.state.userEmailsSelected];
    if (isSelected) {
      userEmailsSelected.push(email);
    } else {
      userEmailsSelected = userEmailsSelected.filter((e) => e !== email);
    }
    this.setState({
      userEmailsSelected,
    });
  };

  render() {
    return (
      <Router
        // deleteSelectedUsers={this.deleteSelectedUsers}
        handleSelectedUser={this.handleSelectedUser}
        userEmailsSelected={this.state.userEmailsSelected}
      />
    );
  }
}

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
