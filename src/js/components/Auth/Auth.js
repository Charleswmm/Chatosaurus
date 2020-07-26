import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

const Auth = ({ children }) => {
  const { state: { authCode } } = useContext(GlobalContext);

  // Placeholder until "boot" scope
  if (authCode) {
    // eslint-disable-next-line no-console
    console.log(authCode);
  }

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
