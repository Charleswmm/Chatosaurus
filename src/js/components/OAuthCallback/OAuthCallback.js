import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import getAccessToken from '../../utilities/getAccessToken';

const OAuthCallback = ({ location: { search }, history }) => {
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['authDetails', 'discordUrls', 'tokenTemplate']);
  const { authDetails: { responseType } } = config;

  const searchParams = new URLSearchParams(search);

  // Get the callback code from the URL Params
  const callbackCode = searchParams.get(responseType);

  useEffect(() => {
    if (callbackCode) {
      getAccessToken(config, callbackCode)
        .then(() => {
          history.replace({
            pathname: '/',
            state: {
              loading: false,
            },
          });
        })
        .catch((e) => {
          const error = `OAuthCallback - getAccessToken - ${e.toString()}`;

          history.replace({
            pathname: '/error',
            state: {
              error,
            },
          });
        });
    }
  }, []);

  if (!callbackCode) {
    const error = 'OAuthCallback - No callbackCode';

    history.replace({
      pathname: '/error',
      state: {
        error,
      },
    });
  }

  return <></>;
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
