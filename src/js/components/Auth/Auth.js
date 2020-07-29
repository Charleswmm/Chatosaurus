import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

const Auth = ({ children }) => {
  const { Fetcher } = useContext(GlobalContext);

  const authCheck = Fetcher.auth();

  console.log(authCheck);

  if (!authCheck) {
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

export default withRouter(Auth);
