import React, { useState } from 'react';
import { useUsers } from '../../hooks/users';
import { useHistory } from 'react-router-dom';
import { toTitleCase } from '../../helpers';
import './UserDetail.css';

const UserDetail = (props) => {
  const {
    getAll: { refetch, loading },
    update: [updateUser, { loading: updateSaving }],
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

  const shouldDisable = updateSaving || loading;

  const getRoles = () => {
    const rows = [];
    ['ADMIN', 'DEVELOPER', 'APP_MANAGER', 'MARKETING', 'SALES'].map((role) => {
      const id = `radio-${role}`;
      return rows.push(
        <div key={role}>
          <input
            type="radio"
            id={id}
            value={role}
            checked={role === userRole}
            onChange={handleRoleChange}
            disabled={shouldDisable ? 'disabled' : ''}
          />
          <label htmlFor={id}>{toTitleCase(role)}</label>
        </div>
      );
    });
    return rows;
  };

  return (
    <section>
      <header>
        <h1>{userEmail}</h1>
        <button disabled={shouldDisable ? 'disabled' : ''} onClick={handleSave}>
          save
        </button>
      </header>
      <div className="details">
        <section>
          Name:{' '}
          <input
            type="text"
            value={userName}
            onChange={handleNameChange}
            disabled={shouldDisable ? 'disabled' : ''}
          />
        </section>
        <section>
          Role
          {getRoles()}
        </section>
      </div>
    </section>
  );
};

export default UserDetail;
