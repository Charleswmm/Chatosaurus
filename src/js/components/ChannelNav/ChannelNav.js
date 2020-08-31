import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import '../../../scss/components/ChannelNav/ChannelNav.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import useDiscordData from '../../hooks/useDiscordData';
import ChannelNavButton, { ChannelNavParent } from '../ChannelNavButton/ChannelNavButton';
import UserControlPanel from '../UserControlPanel/UserControlPanel';

const ChannelNav = () => {
  const history = useHistory();
  const { guild } = useParams();

  const { Config } = useContext(GlobalContext);
  const { discordAPIResources: { userGuilds, pending } } = Config.get(['discordAPIResources']);

  let guildName = '';
  let guildId = pending;

  const guildData = useDiscordData(userGuilds);

  if (guildData) {
    // Checks that the URL param guild id matches the discordAPI user guild id
    const findGuild = guildData.find((e) => e.id === guild);

    if (findGuild) {
      if (guild !== findGuild.id) {
        history.push({
          pathname: '/error',
          state: {
            error: 'Guild ID does not match user guilds',
          },
        });
      }

      const { id, name } = findGuild;

      guildName = name;
      guildId = id;
    }
  }

  return (
    <div className="nav-column nav-column-channels">
      <div className="nav-group nav-group-top">
        <button type="button" className="btn btn-top">
          <h1>{guildName}</h1>
          <div className="svg svg-arrow" />
        </button>
      </div>
      <div className="nav-group nav-group-channels">
        <ChannelNavButtons guildId={guildId} />
      </div>
      <div className="nav-group nav-group-foot">
        <UserControlPanel />
      </div>
    </div>
  );
};

const ChannelNavButtons = ({ guildId }) => {
  const { Config } = useContext(GlobalContext);
  const { discordAPIResources } = Config.get(['discordAPIResources']);
  const { guilds, channels, parentChannel } = discordAPIResources;
  const [hideChildrenId, setHideChildrenId] = useState([]);

  const channelsResource = [guilds, guildId, channels].join('/');
  const guildChannels = useDiscordData(channelsResource);

  const orderChannels = [];

  if (guildChannels) {
    const { guild_id: guildTestId } = guildChannels[0];

    // Checks the channels received from the Discord API belongs to the current guild in view
    if (guildTestId !== guildId) {
      return <></>;
    }

    // Filters out "parents" and "channels" for easier sorting
    const parents = guildChannels.filter((e) => e.type === parentChannel);
    const filteredChannels = guildChannels.filter((e) => e.type !== parentChannel);

    // Sorts channels so that they come after their parent
    parents.forEach((parent) => {
      orderChannels.push(parent);

      filteredChannels.forEach((channel) => {
        const { parent_id: parentId } = channel;

        if (parentId === parent.id) {
          orderChannels.push(channel);
        }
      });
    });
  }

  // When a "parent" is clicked the parent ID is added to the `HideChildrenId` array so that the
  // children will hide
  const hideChildren = (id) => {
    const showId = hideChildrenId.find((e) => e === id);
    const hiddenIds = showId ? hideChildrenId.filter((e) => e !== id) : [...hideChildrenId, id];

    setHideChildrenId(hiddenIds);
  };

  return orderChannels.map((button, index) => {
    if (button.type === parentChannel) {
      return (
        <ChannelNavParent
          key={index.toString()}
          button={button}
          hideChildren={hideChildren}
          hideChildrenId={hideChildrenId}
        />
      );
    }
    return (
      <ChannelNavButton
        key={index.toString()}
        button={button}
        hideChildrenId={hideChildrenId}
      />
    );
  });
};

ChannelNavButtons.propTypes = {
  guildId: PropTypes.string,
};

ChannelNavButtons.defaultProps = {
  guildId: null,
};

export default ChannelNav;
