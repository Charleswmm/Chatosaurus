import axios from 'axios';

class DiscordStore {
  data = {};

  constructor(props) {
    this.Config = props;
  }

  get = async (resource) => {
    // const config = this.Config.get(['discordUrls']);
    // const { discordUrls: { baseUrl } } = config;
    //
    // let value = this.data[resource];
    //
    // if (value === undefined) {
    //   try {
    //     value = await axios.get(baseUrl);
    //   } catch (err) {
    //     // eslint-disable-next-line no-console
    //     console.log('DiscordStore GET', err);
    //   }
    // }
    //
    // return value;
  }
}

export default DiscordStore;
