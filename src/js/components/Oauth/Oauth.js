import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Loading from '../Loading/Loading';

const Oauth = ({ location: { search }, history }) => {
  const { Config, Fetcher } = useContext(GlobalContext);
  const config = Config.get(['authDetails', 'clientDetails', 'requestHeaderVars']);
  const { authDetails, clientDetails, requestHeaderVars: { contentType } } = config;
  const {
    scope, redirectUri, responseType, grantType,
  } = authDetails;
  const { clientId, clientSecret } = clientDetails;

  const searchParams = new URLSearchParams(search);
  const authCode = searchParams.get(responseType);

  useEffect(() => {
    const getToken = async () => {
      const authBodyData = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: grantType,
        code: authCode,
        redirect_uri: redirectUri,
        scope,
      };

      const authBody = Object.entries(authBodyData).map(([key, value]) => `${key}=${value}`).join('&');

      let authTokenData = {};

      try {
        authTokenData = await Fetcher.post('auth', authBody, { headers: { [contentType.key]: contentType.uri } });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('`authData`', err);
      }

      if (!Fetcher.auth(authTokenData.data)) {
        // eslint-disable-next-line no-console
        console.warn('Auth token checks failed inside `getToken` in Oauth');
      }
      history.push('/');
    };

    if (authCode) {
      getToken().catch((err) => {
        // eslint-disable-next-line no-console
        console.log('`getToken`', err);
      });
    }
  }, []);

  if (!authCode) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <Loading />
  );
};

Oauth.propTypes = {
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Oauth.defaultProps = {
  location: null,
  history: null,
};

export default Oauth;
