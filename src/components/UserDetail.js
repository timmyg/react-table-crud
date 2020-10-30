import React, { useState, useEffect } from 'react';
import { useUsers } from '../hooks/users';

const UserDetail = (props) => {
  const {
    update: [updateUser],
  } = useUsers();
  const [userRole, setUserRole] = useState(props.user.role);
  const [userName, setUserName] = useState(props.user.name);
  const [userEmail] = useState(props.user.email);

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
          />{' '}
          <span>{role}</span>{' '}
        </div>
      );
    });
    return rows;
  };

  return (
    <section>
      <div>
        <div>{userEmail}</div>
        <button onClick={handleSave}>save</button>
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
