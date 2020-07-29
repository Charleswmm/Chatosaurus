import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Loading from '../Loading/Loading';

const OAuthCallback = ({ location: { search }, history }) => {
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['authDetails', 'clientDetails', 'discordUrls']);
  const { authDetails, clientDetails, discordUrls: { tokenUrl } } = config;
  const {
    scope, redirectUri, responseType, grantType,
  } = authDetails;
  const { clientId, clientSecret } = clientDetails;

  const searchParams = new URLSearchParams(search);
  const callbackCode = searchParams.get(responseType);

  useEffect(() => {
    const getAccessToken = async () => {
      const bodyData = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: grantType,
        code: callbackCode,
        redirect_uri: redirectUri,
        scope,
      };

      const body = Object.entries(bodyData).map(([key, value]) => `${key}=${value}`).join('&');

      const accessTokenResponse = await axios.post(tokenUrl, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      sessionStorage.setItem('accessToken', JSON.stringify(accessTokenResponse.data));
      history.push('/');
    };

    if (callbackCode) {
      getAccessToken().catch((err) => {
        // eslint-disable-next-line no-console
        console.log('`getAccessToken`', err);
      });
    }
  }, []);

  if (!callbackCode) {
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
