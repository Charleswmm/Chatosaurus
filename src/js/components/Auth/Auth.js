import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

const Auth = ({ children, location }) => {
  const { Config } = useContext(GlobalContext);

  const { tokenTemplate } = Config.get(['tokenTemplate']);
  const { expiresInKey, accessTokenKey } = tokenTemplate;

  const accessTokenTemplateKeys = Object.values(tokenTemplate);
  const accessTokenData = JSON.parse(sessionStorage.getItem(accessTokenKey));

  let accessTokenCheck = false;
  let accessTokenValid = false;

  if (accessTokenData) {
    const accessTokenDataKeys = Object.keys(accessTokenData).sort();
    accessTokenCheck = accessTokenDataKeys.every((property, index) => (
      property === accessTokenTemplateKeys[index]
    ));

    accessTokenValid = accessTokenData[expiresInKey] >= moment().unix();
  }

  if (accessTokenCheck && !accessTokenValid) {
    return (
      <Redirect to={{
        pathname: '/oauthrefresh',
        state: {
          loading: true,
        },
      }}
      />
    );
  }

  if (!accessTokenCheck) {
    const { pathname } = location;

    sessionStorage.setItem('origin', pathname);

    return (
      <Redirect to={{
        pathname: '/login',
        state: {
          loading: false,
        },
      }}
      />
    );
  }

  return (
    <>
      { children }
    </>
  );
};

Auth.propTypes = {
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
};

Auth.defaultProps = {
  location: null,
  children: null,
};

export default withRouter(Auth);
