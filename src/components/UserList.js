import React from 'react';
import { useUsers } from '../hooks/users';
import PropTypes from 'prop-types';
import UserRow from './UserRow';

const UserList = (props) => {
  const {
    getAll: { loading, error, data, refetch },
    delete: [deleteUsers],
    reset: [resetUsers],
  } = useUsers();

  const handleReset = async () => {
    await resetUsers();
    await refetch();
  };

  const handleDelete = async () => {
    await deleteUsers({
      variables: {
        emails: props.userEmailsSelected,
      },
    });
    await refetch();
  };

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
  return (
    <div className="container">
      <div>
        <header>Users</header>
        <button
          disabled={!!props.userEmailsSelected.length ? '' : 'disabled'}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button type="button" onClick={handleReset}>
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
