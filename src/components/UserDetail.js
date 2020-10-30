import React, { useState } from 'react';
import { useUsers } from '../hooks/users';
import { useHistory } from 'react-router-dom';
import { toTitleCase } from '../helpers';

const UserDetail = (props) => {
  const {
    getAll: { refetch },
    update: [updateUser, { loading: updateSaving, error: updateError }],
  } = useUsers();
  const [userRole, setUserRole] = useState(props.user.role);
  const [userName, setUserName] = useState(props.user.name);
  const [userEmail] = useState(props.user.email);
  const history = useHistory();

  const handleNameChange = (event) => {
    setUserName(event.currentTarget.value);
  };
  const handleRoleChange = (event) => {
    setUserRole(event.currentTarget.value);
  };

  const handleSave = async () => {
    await updateUser({
      variables: {
        email: userEmail,
        newAttributes: {
          name: userName,
          role: userRole,
        },
      },
    });
    await refetch();
    history.push('/');
  };

  console.log({ userRole });
  const getRoles = () => {
    const rows = [];
    ['ADMIN', 'DEVELOPER', 'APP_MANAGER', 'MARKETING', 'SALES'].map((role) => {
      rows.push(
        <div key={role}>
          <input
            type="radio"
            name="Admin"
            value={role}
            checked={role === userRole}
            onChange={handleRoleChange}
          />
          {toTitleCase(role)}
        </div>
      );
    });
    return rows;
  };

  return (
    <section>
      <div>
        <div>{userEmail}</div>
        <button disabled={updateSaving ? 'disabled' : ''} onClick={handleSave}>
          save
        </button>
      </div>
      <div>
        <div>
          Name: <input type="text" value={userName} onChange={handleNameChange} />
        </div>
        <div>
          Role
          {getRoles()}
        </div>
      </div>
    </section>
  );
};

export default UserDetail;
