import React from 'react';
import PropTypes from 'prop-types';

const UserDetail = (props) => {
  return <span>{JSON.stringify(props.user, null, 2)}</span>;
};

//   UserDetail.propTypes = {
//     tagline: PropTypes.string,
//   };

export default UserDetail;
