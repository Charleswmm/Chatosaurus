import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import '../../../scss/components/ChannelNav/ChannelNav.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import useDiscordData from '../../hooks/useDiscordData';
import UserControlPanel from '../UserControlPanel/UserControlPanel';

const ChannelNav = () => {
  const { Config } = useContext(GlobalContext);
  const params = useParams();
  const { guild } = params;

  const config = Config.get(['discordAPIResources']);

  const { discordAPIResources } = config;
  const { guilds, users, atMe, channels, pending } = discordAPIResources;

  const [guildId, setGuildId] = useState(pending);

  const guildChannels = useDiscordData([guilds, guildId, channels]);
  const guildData = useDiscordData([users, atMe, guilds]);

  console.log('guildId', guildId);
  console.log('guildData', guildData);
  console.log('guildChannels', guildChannels);

  if (guildData) {
    const findGuild = guildData.find((e) => e.id === guild);
    console.log('findGuild', findGuild);

    if (guildId !== findGuild.id) {
      const { id } = findGuild;
      console.log('id', id);
      setGuildId(id);
    }
  }

  return (
    <div className="nav-column nav-column-channels">
      <div className="nav-group nav-group-top">
        <button type="button" className="btn btn-top">
          <h1>Guild Server</h1>
          <div className="svg svg-arrow" />
        </button>
      </div>
      <ChannelNavButtons />
      <div className="nav-group nav-group-foot">
        <UserControlPanel />
      </div>
    </div>
  );
};

const ChannelNavButtons = () => {
  let block;

  return (
    <ChannelNavButton />
  );
};

const ChannelNavButton = () => {
  let block;

  return (
    <div className="nav-group nav-group-channels">
      <div className="nav-item nav-item-parent">
        <button type="button" className="btn">
          <div className="svg svg-arrow-grey" />
          <div className="btn-text">Text Channels</div>
        </button>
      </div>
      <div className="nav-item nav-item-channel">
        <button type="button" className="btn btn-active">
          <div className="svg svg-hash" />
          <div className="btn-text">general</div>
          <div className="svg svg-add-friend" />
        </button>
      </div>
      <div className="nav-item nav-item-channel">
        <button type="button" className="btn">
          <div className="svg svg-speaker" />
          <div className="btn-text">General</div>
          <div className="svg svg-add-friend" />
        </button>
      </div>
    </div>
  );
};

export default ChannelNav;
