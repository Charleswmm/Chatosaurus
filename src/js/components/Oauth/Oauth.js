import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Loading from '../Loading/Loading';

const Oauth = (props) => {
  const { setAuthCodeInState } = useContext(GlobalContext);
  const { location: { search }, history } = props;

  if (!search) {
    return (
      <Redirect to="/" />
    );
  }

  const searchParams = new URLSearchParams(search);

  if (!searchParams.has('code')) {
    return (
      <Redirect to="/" />
    );
  }

  useEffect(() => {
    setAuthCodeInState(searchParams.get('code'));
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
