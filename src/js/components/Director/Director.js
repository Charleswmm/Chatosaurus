import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

const Director = ({ children, history }) => {
  const { Config } = useContext(GlobalContext);
  const { paths: { mainPath, homePath } } = Config.get(['paths']);

  const origin = sessionStorage.getItem('origin');
  sessionStorage.removeItem('origin');

  const home = ['', mainPath, homePath].join('/');

  let redirect = home;

  if (origin) {
    redirect = origin;

    if (origin === '/') {
      redirect = home;
    }

    const originSplit = origin.split('/');

    if (originSplit[1] === mainPath && !originSplit[2]) {
      redirect = home;
    }
  }

  useEffect(() => {
    history.replace({
      pathname: redirect,
      state: {
        loading: false,
      },
    });
  }, []);

  return (
    <>
      { children }
    </>
  );
};

Director.propTypes = {
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
};

Director.defaultProps = {
  history: null,
  children: null,
};

export default withRouter(Director);
