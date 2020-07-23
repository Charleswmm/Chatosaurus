import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/Login/Login.scss';

const authURLs = {
  base: 'https://discord.com/api',
  auth: 'oauth2/authorize',
};

const authDetails = {
  response_type: 'code',
  client_id: '735260432536961114',
  scope: 'identify%20guilds',
  redirect_uri: 'https%3A%2F%2Fchatosaurus.dev',
};

const Login = (props) => {
  const { base, auth } = authURLs;
  const { response_type: responseType } = authDetails;

  const { location: { search } } = props;
  let callBackQueryKey = '';
  let callBackQueryValue = '';

  if (search) {
    [callBackQueryKey, callBackQueryValue] = search.split('=');
  }

  if (callBackQueryKey.replace('?', '') === responseType) {
    return <div className="this-will-be-the-boot=component">{callBackQueryValue}</div>;
  }

  const authQuery = Object.entries(authDetails).map(([key, value]) => `${key}=${value}`).join('&');

  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <div className="login-content">
          <div className="svg svg-wumpus-direction" />
          <a href={`${base}/${auth}?${authQuery}`} className="login-button">
            <span>Login</span>
          </a>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Login.defaultProps = {
  location: null,
};

export default Login;
