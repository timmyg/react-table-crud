import React, { useState } from 'react';
import { useUsers } from '../hooks/users';
import PropTypes from 'prop-types';
import UserRow from './UserRow';

const UserList = (props) => {
  const {
    getAll: { refetch },
    delete: [deleteUsers],
    reset: [resetUsers],
  } = useUsers();
  const [userEmailsSelected, setUserEmailsSelected] = useState([]);

  const handleReset = async () => {
    await resetUsers();
    await refetch();
  };

  const handleDelete = async () => {
    await deleteUsers({
      variables: {
        emails: userEmailsSelected,
      },
    });
    await refetch();
  };

  const handleSelectedUser = (email, isSelected) => {
    const userEmailsSelectedTemp = [...userEmailsSelected];
    if (isSelected) {
      userEmailsSelectedTemp.push(email);
    } else {
      userEmailsSelectedTemp = userEmailsSelectedTemp.filter((e) => e !== email);
    }
    setUserEmailsSelected(userEmailsSelectedTemp);
  };

  const UserRows = (userRowsProps) => {
    const rows = [];
    for (var i = 0; i < userRowsProps.users.length; i++) {
      const user = userRowsProps.users[i];
      rows.push(
        <UserRow
          key={user.email}
          user={user}
          handleSelectedUser={handleSelectedUser}
          isSelected={userEmailsSelected.some((e) => e === user.email)}
        />
      );
    }
    return rows;
  };
  return (
    <div className="container">
      <div>
        <header>Users</header>
        <button disabled={!!userEmailsSelected.length ? '' : 'disabled'} onClick={handleDelete}>
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
