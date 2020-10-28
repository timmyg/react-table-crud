import React from 'react';
import PropTypes from 'prop-types';
import UserRow from './UserRow';
import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';

const DELETE_USERS_MUTATION = gql`
  mutation deleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails)
  }
`;

const RESET_USERS_MUTATION = gql`
  mutation resetUsers {
    resetUsers
  }
`;

// class UserList extends React.Component {
const UserList = (props) => {
  // render() {
  const [deleteUsers, data2] = useMutation(DELETE_USERS_MUTATION);
  const [resetUsers] = useMutation(RESET_USERS_MUTATION);

  const UserRows = (userRowsProps) => {
    const rows = [];
    for (var i = 0; i < userRowsProps.users.length; i++) {
      const user = userRowsProps.users[i];
      rows.push(
        <UserRow
          key={user.email}
          user={user}
          handleSelectedUser={props.handleSelectedUser}
          isSelected={props.userEmailsSelected.some((e) => e === user.email)}
        />
      );
    }
    return rows;
  };

  // const resetClick = function (e) {
  //   resetUsers()
  // };

  console.log(props.userEmailsSelected);
  return (
    <div className="container">
      <div>
        <header>Users</header>
        <button
          disabled={!!props.userEmailsSelected.length ? '' : 'disabled'}
          onClick={(c) => deleteUsers({ variables: { emails: props.userEmailsSelected } })}
        >
          Delete
        </button>
        <button type="button" onClick={resetUsers}>
          Reset
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
          <UserRows users={props.users} />
        </tbody>
      </table>
    </div>
  );
  // }
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ),
  addFish: PropTypes.func,
};

export default UserList;
