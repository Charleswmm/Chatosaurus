import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import getAccessToken from '../../utilities/getAccessToken';
import Loading from '../Loading/Loading';

const Auth = ({ children, history }) => {
  const { Config, DiscordStore } = useContext(GlobalContext);

  const config = Config.get(['authDetails', 'discordUrls', 'discordAPIResources', 'tokenTemplate']);
  const { discordAPIResources, tokenTemplate } = config;
  const { expiresInKey, refreshTokenKey, accessTokenKey } = tokenTemplate;
  const { user, client } = discordAPIResources;

  const accessTokenData = JSON.parse(sessionStorage.getItem(accessTokenKey));
  const accessTokenTemplateKeys = Object.values(tokenTemplate);

  let accessTokenCheck = false;

  if (accessTokenData) {
    const accessTokenDataKeys = Object.keys(accessTokenData).sort();
    accessTokenCheck = accessTokenDataKeys.every((property, index) => (
      property === accessTokenTemplateKeys[index]
    ));
  }

  if (!accessTokenCheck) {
    return (
      <Redirect to="/login" />
    );
  }

  const accessTokenInvalid = accessTokenData[expiresInKey] < moment().unix();
  const refreshToken = accessTokenData[refreshTokenKey];

  useEffect(() => {
    if (accessTokenInvalid && accessTokenCheck) {
      getAccessToken(config, history, refreshToken, true).catch((err) => {
        // eslint-disable-next-line no-console
        console.log('`getAccessToken` refresh', err);
        history.push('/');
      });
    }
  }, []);

  // Proof of concept

  useEffect(() => {
    const getUser = async () => {
      let getUserData = {};

      getUserData = await DiscordStore.get(user, client);

      console.log('getUser', getUserData);
    };

    if (accessTokenCheck && !accessTokenInvalid) {
      getUser().catch((err) => {
        // eslint-disable-next-line no-console
        console.log('`getUser`', err);
      });
    }
  }, []);

  useEffect(() => {
    const getUser1 = async () => {
      let getUserData = {};

      try {
        getUserData = await DiscordStore.get(user, client);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('`getUserData`', err);
      }

      console.log('getUser1', getUserData);
    };

    if (accessTokenCheck && !accessTokenInvalid) {
      getUser1().catch((err) => {
        // eslint-disable-next-line no-console
        console.log('`getUser1`', err);
      });
    }
  }, []);

  useEffect(() => {
    const getUser2 = async () => {
      let getUserData = {};

      try {
        getUserData = await DiscordStore.getData(user, client);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('`getUserData`', err);
      }

      console.log('getUser2', getUserData);
    };

    if (accessTokenCheck && !accessTokenInvalid) {
      getUser2().catch((err) => {
        // eslint-disable-next-line no-console
        console.log('`getUser2`', err);
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
      console.log('DiscordStore.data', DiscordStore.data);
      console.log('DiscordStore.queue', DiscordStore.queue);
    };

    setTimeout(() => {
      if (accessTokenCheck && !accessTokenInvalid) {
        next().catch((err) => {
          // eslint-disable-next-line no-console
          console.log('`next`', err);
        });
      }
    }, 5000);
  }, []);

  // Proof of concept end

  if (accessTokenInvalid) {
    return (
      <Loading />
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
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Auth.defaultProps = {
  children: null,
  history: null,
};

export default withRouter(Auth);
