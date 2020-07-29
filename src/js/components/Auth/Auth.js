import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

const accessTokenContent = [
  'access_token',
  'expires_in',
  'refresh_token',
  'scope',
  'token_type',
];

const Auth = ({ children }) => {
  const { Fetcher } = useContext(GlobalContext);

  const accessTokenData = JSON.parse(sessionStorage.getItem('accessToken'));

  let accessTokenCheck = false;

  if (accessTokenData) {
    const accessTokenDataKeys = Object.keys(accessTokenData).sort();
    accessTokenCheck = accessTokenDataKeys.every((e, index) => e === accessTokenContent[index]);
  }

  // Proof of concept

  // useEffect(() => {
  //   const getUser = async () => {
  //     let userData = {};
  //
  //     try {
  //       userData = await DiscordStore.get(['users', '@me']);
  //     } catch (err) {
  //       // eslint-disable-next-line no-console
  //       console.log('`userData`', err);
  //     }
  //
  //     console.log(userData);
  //   };
  //
  //   if (authCheck) {
  //     getUser().catch((err) => {
  //       // eslint-disable-next-line no-console
  //       console.log('`getUser`', err);
  //     });
  //   }
  // }, []);

  if (!accessTokenCheck) {
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
