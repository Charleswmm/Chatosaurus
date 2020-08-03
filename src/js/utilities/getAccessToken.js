import axios from 'axios';
import moment from 'moment';

const getAccessToken = async (config, history, token, refresh) => {
  const { authDetails, tokenTemplate, discordUrls: { tokenUrl } } = config;
  const { expiresInKey, accessTokenKey } = tokenTemplate;
  const { scope, redirectUri, grantType, clientId, clientSecret, refreshType } = authDetails;

  let bodyData = {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: grantType,
    scope,
  };

  let bodyDataExtra = {
    grant_type: grantType,
    code: token,
  };

  if (refresh) {
    bodyDataExtra = {
      grant_type: refreshType,
      refresh_token: token,
    };
  }

  bodyData = {
    ...bodyData, ...bodyDataExtra,
  };

  const body = Object.entries(bodyData).map(([key, value]) => `${key}=${value}`).join('&');

  const accessTokenResponse = await axios.post(tokenUrl, body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  let responseData = accessTokenResponse.data;
  const newExpireTime = responseData[expiresInKey] + moment().unix();

  // Modify the response data to include the new expire time
  responseData = {
    ...responseData, [expiresInKey]: newExpireTime,
  };

  sessionStorage.setItem(accessTokenKey, JSON.stringify(responseData));
  history.push('/');
};

export default getAccessToken;
