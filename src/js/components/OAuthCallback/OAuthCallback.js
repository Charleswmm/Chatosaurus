import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import getAccessToken from '../../utilities/getAccessToken';
import Loading from '../Loading/Loading';

const OAuthCallback = ({ location: { search }, history }) => {
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['authDetails', 'discordUrls', 'tokenTemplate']);
  const { authDetails: { responseType } } = config;

  const searchParams = new URLSearchParams(search);

  // Get the callback code from the URL Params
  const callbackCode = searchParams.get(responseType);

  useEffect(() => {
    if (callbackCode) {
      getAccessToken(config, history, callbackCode).catch((err) => {
        // eslint-disable-next-line no-console
        console.log('`getAccessToken` initial auth', err);
        history.push('/');
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
