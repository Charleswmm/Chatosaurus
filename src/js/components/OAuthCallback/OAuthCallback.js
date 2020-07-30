import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Loading from '../Loading/Loading';

const OAuthCallback = ({ location: { search }, history }) => {
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['authDetails', 'discordUrls', 'tokenTemplate']);
  const { authDetails, tokenTemplate, discordUrls: { tokenUrl } } = config;
  const { expiresInKey, refreshTokenKey, accessTokenKey } = tokenTemplate;
  const {
    scope, redirectUri, grantType, clientId, clientSecret, refreshType, responseType,
  } = authDetails;

  const searchParams = new URLSearchParams(search);

  // Get the callback code or refresh token from the URL Params
  const callbackCode = searchParams.get(responseType);
  const refreshCode = searchParams.get(refreshTokenKey);

  const getAccessToken = async () => {
    let bodyData = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: grantType,
      scope,
    };

    let bodyDataExtra = {
      grant_type: grantType,
      code: callbackCode,
    };

    if (refreshCode) {
      bodyDataExtra = {
        grant_type: refreshType,
        refresh_token: refreshCode,
      };
    }

    bodyData = {
      ...bodyData, ...bodyDataExtra,
    };

    const body = Object.entries(bodyData).map(([key, value]) => `${key}=${value}`).join('&');

    const accessTokenResponse = await axios.post(tokenUrl, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    let responseData = accessTokenResponse.data;
    const newExpireTime = responseData[expiresInKey] + moment().unix();

    // Modify the response data to include the new expire time
    responseData = {
      ...responseData, [expiresInKey]: newExpireTime,
    };

    sessionStorage.setItem(accessTokenKey, JSON.stringify(responseData));
    history.push('/');
  };

  useEffect(() => {
    if (callbackCode || refreshCode) {
      getAccessToken().catch((err) => {
        // eslint-disable-next-line no-console
        console.log('`getAccessToken`', err);
      });
    }
  }, []);

  if (!callbackCode && !refreshCode) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <Loading />
  );
};

OAuthCallback.propTypes = {
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

OAuthCallback.defaultProps = {
  location: null,
  history: null,
};

export default OAuthCallback;
