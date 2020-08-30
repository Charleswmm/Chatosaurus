import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import useDiscordData from '../../hooks/useDiscordData';
import ChatView from '../ChatView/ChatView';
import NoChat from '../NoChat/NoChat';

const ChatControl = (props) => {
  const { match: { params: { id: channelId } } } = props;

  const { Config } = useContext(GlobalContext);
  const config = Config.get(['groupNavDMButtons', 'discordAPIResources', 'channelNavButtonClasses']);
  const { groupNavDMButtons, discordAPIResources, channelNavButtonClasses } = config;
  const { channels, dmChannel } = discordAPIResources;
  const { svgBackground } = channelNavButtonClasses;

  const dmButton = groupNavDMButtons.filter((e) => e.id === channelId).shift();

  if (dmButton) {
    const { id, name, avatarSrc, backgroundColor } = dmButton;

    return (
      <ChatView
        id={id}
        name={name}
        type={dmChannel}
        avatarSrc={avatarSrc}
        backgroundColor={backgroundColor}
      />
    );
  }

  const channelResource = [channels, channelId].join('/');
  const channel = useDiscordData(channelResource);

  if (!channel) {
    return <NoChat />;
  }

  const { id, name, type } = channel;

  return (
    <ChatView
      id={id}
      name={name}
      type={type}
      backgroundColor={svgBackground}
    />
  );
};

ChatControl.propTypes = {
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ChatControl.defaultProps = {
  match: null,
};

export default ChatControl;
