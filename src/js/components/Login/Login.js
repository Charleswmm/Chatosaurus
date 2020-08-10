import React, { useContext } from 'react';
import '../../../scss/components/Login/Login.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

const Login = () => {
  const { Config } = useContext(GlobalContext);

  const config = Config.get(['authDetails', 'discordUrls']);
  const { authDetails, discordUrls: { authUrl } } = config;
  const { scope, redirectUri, responseType, clientId } = authDetails;

  const scopeUrlEncoded = encodeURIComponent(scope);
  const redirectUriEncoded = encodeURIComponent(redirectUri);

  const authQueryData = {
    response_type: responseType,
    client_id: clientId,
    scope: scopeUrlEncoded,
    redirect_uri: redirectUriEncoded,
  };

  // Build the query string required by the Discord API
  const authQuery = Object.entries(authQueryData).map(([key, value]) => `${key}=${value}`).join('&');

  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <div className="login-content">
          <div className="svg svg-wumpus-direction" />
          <a href={`${authUrl}?${authQuery}`} className="login-button">
            <span>Login</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
