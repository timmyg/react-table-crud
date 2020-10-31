import React from 'react';
import { Link } from 'react-router-dom';
import { toTitleCase } from '../../helpers';

class UserRow extends React.Component {
  onRowClick = (email) => {
    this.props.toggleSelectedUser(email);
  };

  // handleSelected = (event) => {
  //   const isChecked = event.currentTarget.checked;
  //   this.props.handleSelectedUser(this.props.user.email, isChecked);
  // };

  render() {
    const { user } = this.props;
    const { email } = user;
    const checkboxId = `checkbox-${email}`;
    const rowCells = [];
    rowCells.push(
      <td key={`selected-${email}`}>
        <input
          type="checkbox"
          defaultChecked={this.props.isSelected}
          onChange={this.handleSelected}
          disabled={this.props.shouldDisable ? 'disabled' : ''}
          id={checkboxId}
        />
      </td>
    );
    rowCells.push(
      <td key={`email-${email}`}>
        <Link to={`/users/${email}`}>{email}</Link>
      </td>
    );
    rowCells.push(<td key={`name-${email}`}>{user.name}</td>);
    rowCells.push(<td key={`role-${email}`}>{toTitleCase(user.role)}</td>);
    return (
      <tr
        key={`row-${email}`}
        onClick={() => {
          this.onRowClick(email);
        }}
      >
        {rowCells}
      </tr>
    );
  }
}

export default UserRow;
