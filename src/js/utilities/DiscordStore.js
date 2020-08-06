import axios from 'axios';
import moment from 'moment';

class DiscordStore {
  data = [];

  /**
   * The promise queue
   * @type {[]}
   */
  queue = [];

  constructor(props) {
    this.Config = props;
  }

  /**
   * Adds a promise entry to the promise queue
   * @param promiseEntry
   */
  addQueue = (promiseEntry) => {
    this.queue.push(promiseEntry);
  }

  /**
   * Removes a promise entry from the promise queue
   * @param promiseEntry
   */
  removeQueue = (promiseEntry) => {
    const filteredQueue = this.queue.filter((e) => (
      e.resourceKey !== promiseEntry.resourceKey
    ));

    this.queue = [
      ...filteredQueue,
    ];
  }

  /**
   * Creates an axios get request to the Discord API for the requested resource
   * @param resourceKey
   * @returns {Promise}
   */
  createAPIPromise = (resourceKey) => {
    const config = this.Config.get(['discordUrls', 'discordAPIResources', 'tokenTemplate']);
    const { discordUrls: { baseUrl }, discordAPIResources: { client }, tokenTemplate } = config;
    const { accessTokenKey, tokenTypeKey } = tokenTemplate;

    const [userType, resource] = resourceKey.split('_');
    const requestUrl = [baseUrl, resource].join('/');

    let token;

    if (userType === client) {
      const sessionToken = JSON.parse(sessionStorage.getItem(accessTokenKey));
      token = [sessionToken[tokenTypeKey], sessionToken[accessTokenKey]].join(' ');
    }

    if (!token) {
      // Extreme edge case, sanity check
      throw new Error('No access token');
    }

    // Request the resource from Discord's API
    return axios
      .get((requestUrl), {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        if (typeof data !== 'object') {
          throw new Error('Unexpected data structure found in response.');
        }

        return data;
      })
      .finally(() => {
      // Remove promise from queue
        this.removeQueue({
          resourceKey,
        });
      })
      .catch((err) => {
      // eslint-disable-next-line no-console
        console.log('DiscordStore axios get', err);
      });
  }

  /**
   * Gets the resource from either memory or the Discord API
   * @param resource
   * @param userType
   * @returns {Promise}
   */
  get = (resource, userType) => {
    const resourceKey = [userType, resource].join('_');

    // Find the resource data in memory
    const resourceData = this.data.find((e) => e.resourceKey === resourceKey);

    if (resourceData && resourceData.maxAge >= moment().unix()) {
      // Return the existing store
      return resourceData;
    }

    // Check if the promise exists in the queue
    const queueEntry = this.queue.find((e) => e.resourceKey === resourceKey);
    let promise = queueEntry ? queueEntry.promise : null;

    if (!promise) {
      // Establish an fresh promise
      promise = this.createAPIPromise(resourceKey);

      // Add the promise to the queue
      this.addQueue({
        resourceKey,
        promise,
      });
    }

    return promise.then((response) => {
      const { data, headers, status, statusText } = response;
      const maxAge = moment().unix() + 120;

      const entry = {
        resourceKey,
        maxAge,
        response: {
          data,
          headers,
          status,
          statusText,
        },
      };

      this.set(entry);

      return entry;
    });
  }

  /**
   * Gets only the response data from the resource data
   * @param resource
   * @param userType
   * @returns {Promise}
   */
  getData = (resource, userType) => (
    this.get(resource, userType).then((resourceFull) => resourceFull.response.data)
  )

  /**
   * Removes duplicate data then adds the data passed to it to memory
   * @param data
   */
  set = (data) => {
    const filterOldData = this.data.filter((e) => e.resourceKey !== data.resourceKey);

    this.data = [
      ...filterOldData,
      data,
    ];
  }
}

export default DiscordStore;
