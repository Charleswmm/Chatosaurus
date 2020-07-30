import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

const Auth = ({ children }) => {
  const { Config, DiscordStore } = useContext(GlobalContext);

  const config = Config.get(['authDetails', 'discordUrls', 'discordAPIResources', 'tokenTemplate']);
  const { discordAPIResources, tokenTemplate } = config;
  const { expiresInKey, refreshTokenKey, accessTokenKey } = tokenTemplate;
  const { user, client } = discordAPIResources;

  let accessTokenCheck = false;
  let accessTokenIsValid = false;

  const accessTokenData = JSON.parse(sessionStorage.getItem(accessTokenKey));
  const tokenTemplateKeys = Object.values(tokenTemplate);

  if (accessTokenData) {
    const accessTokenDataKeys = Object.keys(accessTokenData).sort();
    accessTokenCheck = accessTokenDataKeys.every((e, index) => e === tokenTemplateKeys[index]);
    accessTokenIsValid = accessTokenData[expiresInKey] > moment().unix();
  }

  const refreshToken = accessTokenData[refreshTokenKey];

  // Proof of concept

  useEffect(() => {
    const getUser = async () => {
      let getUserData = {};

      try {
        getUserData = await DiscordStore.get(user, client);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('`getUserData`', err);
      }

      console.log('getUser', getUserData);
    };

    if (accessTokenCheck && accessTokenIsValid) {
      getUser().catch((err) => {
        // eslint-disable-next-line no-console
        console.log('`getUser`', err);
      });
    }
  }, []);

  useEffect(() => {
    const next = async () => {
      let getUserData = {};

      try {
        getUserData = await DiscordStore.get(user, client);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('`next`', err);
      }

      console.log('next', getUserData);
    };

    if (accessTokenCheck && accessTokenIsValid) {
      next().catch((err) => {
        // eslint-disable-next-line no-console
        console.log('`next`', err);
      });
    }
  }, []);

  // Proof of concept end

  if (!accessTokenCheck) {
    return (
      <Redirect to="/login" />
    );
  }

  if (!accessTokenIsValid) {
    return (
      <Redirect to={{
        pathname: '/OauthCallback',
        search: `?${refreshTokenKey}=${refreshToken}`,
      }}
      />
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
  children: null,
};

export default Auth;
