import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class UserRow extends React.Component {
  userIdsToDelete = [];

  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  toTitleCase(string) {
    string = string.replace(/_/g, ' ');
    return string
      .split(' ')
      .map((x) => this.capitalizeFirstLetter(x))
      .join(' ');
  }

  handleSelected = (event) => {
    const isChecked = event.currentTarget.checked;
    this.props.handleSelectedUser(this.props.user.email, isChecked);
  };

  render() {
    const { user } = this.props;
    const { email } = user;
    const rowCells = [];
    rowCells.push(
      <td key={`selected-${email}`}>
        <input
          type="checkbox"
          defaultChecked={this.props.isSelected}
          onChange={this.handleSelected}
        />
      </td>
    );
    rowCells.push(
      <td key={`email-${email}`}>
        <Link to={`/users/${email}`}>{email}</Link>
      </td>
    );
    rowCells.push(<td key={`name-${email}`}>{user.name}</td>);
    rowCells.push(<td key={`role-${email}`}>{this.toTitleCase(user.role)}</td>);
    return <tr key={`row-${email}`}>{rowCells}</tr>;
  }
}

// UserList.propTypes = {
//   users: PropTypes.arrayOf(
//     PropTypes.shape({
//       email: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       role: PropTypes.string.isRequired,
//     })
//   ),
//   addFish: PropTypes.func,
// };

export default UserRow;
