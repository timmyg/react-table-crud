import React from 'react';
import PropTypes from 'prop-types';

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

  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  toTitleCase(string) {
    console.log({ string });
    string = string.replace(/_/g, ' ');
    return string
      .split(' ')
      .map((x) => this.capitalizeFirstLetter(x))
      .join(' ');
  }

  render() {
    const UserRows = (props) => {
      const rows = [];
      for (var i = 0; i < props.users.length; i++) {
        const user = props.users[i];
        const { email } = user;
        const rowCells = [];
        rowCells.push(
          <td key={`selected-${email}`}>
            <input type="checkbox" onChange={this.handleDeleteToggle} />
          </td>
        );
        rowCells.push(<td key={`email-${email}`}>{user.email}</td>);
        rowCells.push(<td key={`name-${email}`}>{user.name}</td>);
        rowCells.push(<td key={`role-${email}`}>{this.toTitleCase(user.role)}</td>);
        rows.push(
          <tr key={i} id={`${i}`}>
            {rowCells}
          </tr>
        );
      }
      return rows;
    };

    return (
      <div className="container">
        <div>
          <header>Users</header>
          <button
          // disabled={!!usersToDelete.length ? '' : 'disabled'}
          // onClick={this.handleDeleteSubmit}
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
