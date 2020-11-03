import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useUsers } from '../../hooks/users';
import UserRow from './UserRow';
import '../../styles/Table.css';

const UserList = (props) => {
  const {
    getAll: { refetch, loading },
    delete: [deleteUsers, { loading: deleting }],
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
    setUserEmailsSelected([]);
    await refetch();
  };

  const toggleSelectedUser = (email) => {
    console.log({ email });
    let userEmailsSelectedTemp = [...userEmailsSelected];
    const alreadySelected = userEmailsSelectedTemp.some((e) => e === email);
    console.log({ alreadySelected });
    if (alreadySelected) {
      userEmailsSelectedTemp = userEmailsSelectedTemp.filter((e) => e !== email);
    } else {
      userEmailsSelectedTemp.push(email);
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
          toggleSelectedUser={toggleSelectedUser}
          isSelected={userEmailsSelected.some((e) => e === user.email)}
        />
      );
    }
    return rows;
  };
  return (
    <div className="container">
      <section>
        <header>
          <h1 class="font-display">Users</h1>
          <div className="action">
            <button type="button" onClick={handleReset}>
              Reset
            </button>
            <button
              disabled={!!userEmailsSelected.length && !deleting ? '' : 'disabled'}
              onClick={handleDelete}
              className="danger outline"
            >
              Delete
            </button>
          </div>
        </header>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th class="font-medium">Email</th>
              <th class="font-medium">Name</th>
              <th class="font-medium">Role</th>
            </tr>
            <UserRows users={props.users} />
          </tbody>
        </table>
      </section>
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
