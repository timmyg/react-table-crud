import React, { useState } from 'react';
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
    let userEmailsSelectedTemp = [...userEmailsSelected];
    const alreadySelected = userEmailsSelectedTemp.some((e) => e === email);
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
          <h1 className="font-display">Users</h1>
          <div className="action">
            {/* <button type="button" onClick={handleReset}>
              Reset
            </button> */}
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
              <th className="font-medium">Email</th>
              <th className="font-medium">Name</th>
              <th className="font-medium">Role</th>
            </tr>
            <UserRows users={props.users} />
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserList;
