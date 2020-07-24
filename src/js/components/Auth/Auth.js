import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router';

const Auth = ({ children }) => {
  // Placeholder until "Boot" story
  const authData = false;

  if (!authData) {
    return (
      <Redirect to="/login" />
    );
  }

  return (
    <>
      { children }
    </>
  );
};

Auth.propTypes = {
  children: PropTypes.node,
};

Auth.defaultProps = {
  children: PropTypes.node,
};

export default Auth;
