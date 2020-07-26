import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Loading from '../Loading/Loading';

const Oauth = (props) => {
  const { setAuthCodeInState, Config } = useContext(GlobalContext);
  const { authDetails: { responseType } } = Config.get(['authDetails']);
  const { location: { search }, history } = props;

  const searchParams = new URLSearchParams(search);

  if (!searchParams.has(responseType)) {
    return (
      <Redirect to="/" />
    );
  }

  useEffect(() => {
    setAuthCodeInState(searchParams.get(responseType));
    history.push('/login');
  }, []);

  return (
    <Loading />
  );
};

Oauth.propTypes = {
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Oauth.defaultProps = {
  history: null,
  location: null,
};

export default Oauth;
