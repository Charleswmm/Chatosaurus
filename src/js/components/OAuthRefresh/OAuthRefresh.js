import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import getAccessToken from '../../utilities/getAccessToken';

const OAuthRefresh = ({ history }) => {
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['authDetails', 'discordUrls', 'tokenTemplate']);
  const { tokenTemplate: { accessTokenKey, refreshTokenKey } } = config;

  const accessTokenData = JSON.parse(sessionStorage.getItem(accessTokenKey));
  const refreshToken = accessTokenData[refreshTokenKey];

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
