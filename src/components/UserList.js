import React from 'react';
import PropTypes from 'prop-types';
import UserRow from './UserRow';

class UserList extends React.Component {
  render() {
    const UserRows = (props) => {
      const rows = [];
      for (var i = 0; i < props.users.length; i++) {
        const user = props.users[i];
        rows.push(
          <UserRow
            key={user.email}
            user={user}
            handleSelectedUser={this.props.handleSelectedUser}
            isSelected={this.props.userEmailsSelected.some((e) => e === user.email)}
          />
        );
      }
      return rows;
    };

    console.log(this.props);
    return (
      <div className="container">
        <div>
          <header>Users</header>
          <button
            // disabled={!!this.selectedUserEmails.length ? '' : 'disabled'}
            onClick={this.props.deleteSelectedUsers}
          >
            Delete
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
            <UserRows users={this.props.users} />
          </tbody>
        </table>
      </div>
    );
  }
}

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
