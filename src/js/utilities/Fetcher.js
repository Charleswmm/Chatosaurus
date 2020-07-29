import axios from 'axios';

class Fetcher {
  data = {};

  constructor(props) {
    this.Config = props;
  }

  /**
   * @param authData
   * @returns {boolean}
   */
  auth = (authData = null) => {
    const authDataItem = 'authData';

    if (!authData) {
      return this.authCheck(authDataItem);
    }

    sessionStorage.setItem(authDataItem, JSON.stringify(authData));
    return this.authCheck(authDataItem);
  }

  /**
   * @param authDataItem
   * @returns {boolean}
   */
  authCheck = (authDataItem) => {
    const authData = sessionStorage.getItem(authDataItem);
    if (!authData) {
      return false;
    }
    const authDataKeys = authData ? Object.keys(JSON.parse(authData)) : null;

    return !!authDataKeys.find((e) => e === 'access_token');
  }

  delete = (resource) => {

  }

  get = (resource) => {

  }

  patch = (resource) => {

  }

  /**
   * @param resource
   * @param body
   * @param headers
   * @returns {Promise<void>}
   */
  post = async (resource, body, headers = { headers: { 'Content-Type': 'application/JSON' } }) => {
    const config = this.Config.get(['discordUrls', 'authDetails']);
    const { discordUrls: { baseUrl, tokenUrl } } = config;

    let value = this.data[resource];

    if (value === undefined) {
      try {
        value = await axios.post(tokenUrl, body, { ...headers });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Fetcher POST', err);
      }
    }

    return value;
  }
}

export default Fetcher;
