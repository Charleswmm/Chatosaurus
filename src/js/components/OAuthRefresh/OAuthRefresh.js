import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import getAccessToken from '../../utilities/getAccessToken';

const OAuthRefresh = ({ history }) => {
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['authDetails', 'discordUrls', 'tokenTemplate']);
  const { tokenTemplate: { accessTokenKey, refreshTokenKey } } = config;

  // Get the refresh token from the access token data in the session storage
  const accessTokenData = JSON.parse(sessionStorage.getItem(accessTokenKey));
  const refreshToken = accessTokenData[refreshTokenKey];

  // Get the access token after the components' first render
  useEffect(() => {
    getAccessToken(config, refreshToken, true)
      .then(() => {
        history.replace({
          pathname: '/',
          state: {
            loading: false,
          },
        });
      })
      .catch((e) => {
        const error = `OAuthRefresh - getAccessToken - ${e.toString()} - Please re-login`;

        history.replace({
          pathname: '/error',
          state: {
            error,
          },
        });
      });
  }, []);

  return <></>;
};

OAuthRefresh.propTypes = {
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

OAuthRefresh.defaultProps = {
  history: null,
};

export default OAuthRefresh;
