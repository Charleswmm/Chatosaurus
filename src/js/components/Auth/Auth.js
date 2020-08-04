import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import getAccessToken from '../../utilities/getAccessToken';
import Loading from '../Loading/Loading';

const Auth = ({ children, history }) => {
  const { Config } = useContext(GlobalContext);

  const config = Config.get(['authDetails', 'discordUrls', 'discordAPIResources', 'tokenTemplate']);
  const { tokenTemplate } = config;
  const { expiresInKey, refreshTokenKey, accessTokenKey } = tokenTemplate;

  const accessTokenTemplateKeys = Object.values(tokenTemplate);
  const accessTokenData = JSON.parse(sessionStorage.getItem(accessTokenKey));

  let accessTokenCheck = false;
  let accessTokenValid = false;
  let refreshToken = '';

  if (accessTokenData) {
    const accessTokenDataKeys = Object.keys(accessTokenData).sort();
    accessTokenCheck = accessTokenDataKeys.every((property, index) => (
      property === accessTokenTemplateKeys[index]
    ));

    accessTokenValid = accessTokenData[expiresInKey] >= moment().unix();
    refreshToken = accessTokenData[refreshTokenKey];
  }

  useEffect(() => {
    if (accessTokenCheck && !accessTokenValid) {
      // Refresh access token if it is invalid
      getAccessToken(config, refreshToken, true)
        .then(() => {
          history.push('/');
        })
        .catch((e) => {
          const error = `Auth - getAccessToken - ${e.toString()}`;

          history.push({
            pathname: '/error',
            state: {
              error,
            },
          });
        });
    }
  });

  if (!accessTokenCheck) {
    return (
      <Redirect to="/login" />
    );
  }

  if (!accessTokenValid) {
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
