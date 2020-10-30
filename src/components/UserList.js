import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useUsers } from '../hooks/users';
import UserRow from './UserRow';

const UserList = (props) => {
  const {
    getAll: { refetch, loading },
    delete: [deleteUsers, { loading: deleting }],
    reset: [resetUsers],
  } = useUsers();
  console.log(deleting);
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
    setUserEmailsSelected([]);
    await refetch();
  };

  const handleSelectedUser = (email, isSelected) => {
    let userEmailsSelectedTemp = [...userEmailsSelected];
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
          shouldDisable={deleting || loading}
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
        <button
          disabled={!!userEmailsSelected.length && !deleting ? '' : 'disabled'}
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
