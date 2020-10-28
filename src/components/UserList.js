import React from 'react';
import PropTypes from 'prop-types';

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function toTitleCase(string) {
  string = string.replace(/_/g, ' ');
  return string
    .split(' ')
    .map((x) => capitalizeFirstLetter(x))
    .join(' ');
}

// const UserList = ({ users }) => {
class UserList extends React.Component {
  usersToDelete = [];

  handleDeleteSubmit() {
    console.log('ondelete');
    // this.props.addFish(fish);
  }

  handleDeleteToggle(event) {
    const isChecked = event.currentTarget.checked;
    console.log({ isChecked });
  }

  render() {
    const rows = [];
    const usersToDelete = [];
    const { users } = this.props;

    for (var i = 0; i < users.length; i++) {
      const user = users[i];
      const { email: userId } = user;
      const rowCells = [];
      rowCells.push(
        <td key={'selected' + userId}>
          <input type="checkbox" onChange={this.handleDeleteToggle} />
        </td>
      );
      rowCells.push(<td key={`email-${userId}`}>{user.email}</td>);
      rowCells.push(<td key={`name-${userId}`}>{user.name}</td>);
      rowCells.push(<td key={`role-${userId}`}>{toTitleCase(user.role)}</td>);

      rows.push(
        <tr key={i} id={`${i}`}>
          {rowCells}
        </tr>
      );
    }
    console.log({ rows });
    return (
      <div className="container">
        <div>
          <header>Users</header>
          <button
            disabled={!!usersToDelete.length ? '' : 'disabled'}
            onClick={this.handleDeleteSubmit}
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
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

//   UserList.propTypes = {
//     tagline: PropTypes.string,
//   };

export default UserList;
