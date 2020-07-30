import axios from 'axios';

class DiscordStore {
  data = {};

  constructor(props) {
    this.Config = props;
  }

  get = async (resource, userType) => {
    const config = this.Config.get(['discordUrls', 'discordAPIResources', 'tokenTemplate']);
    const { discordUrls: { baseUrl }, discordAPIResources: { client }, tokenTemplate } = config;
    const { accessTokenKey, tokenTypeKey } = tokenTemplate;

    const dataKey = resource ? userType.concat('', resource.replace(/([/@])/gm, '')) : null;

    let value = this.data[dataKey];

    console.log('this data value', value);

    if (value) {
      return value;
    }

    console.log('dataKey', dataKey);

    if (value === undefined) {
      let token;

      if (userType === client) {
        const sessionToken = JSON.parse(sessionStorage.getItem(accessTokenKey));

        token = [sessionToken[tokenTypeKey], sessionToken[accessTokenKey]].join(' ');
      }

      try {
        const discordGet = await axios.get((baseUrl + resource), {
          headers: {
            Authorization: token,
          },
        });

        value = discordGet.data;

        this.set({
          [dataKey]: value,
        });

        console.log('data after it has been set with discord get response', this.data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('DiscordStore axios get', err);
      }
    }

    return value;
  }

  set(data) {
    this.data = {
      ...this.data, ...data,
    };
  }
}

export default DiscordStore;
