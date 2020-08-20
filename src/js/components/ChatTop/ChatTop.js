import React, { useContext } from 'react';
import '../../../scss/components/ChatTop/ChatTop.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import useDiscordData from '../../hooks/useDiscordData';
import IconButton, { iconButtonSubType, iconButtonToolTipPosition } from '../IconButton/IconButton';

const ChatTop = () => {
  const { Config } = useContext(GlobalContext);

  const { discordAPIResources: { client, users, atMe } } = Config.get(['discordAPIResources']);

  const userData = useDiscordData([users, atMe], client);

  let userName = '...';

  if (userData) {
    userName = userData.username;
  }

  return (
    <div className="chat-top">
      <nav className="nav-row">
        <div className="nav-group">
          <div className="nav-item flex-grow">
            <div className="svg svg-people" />
            <div className="nav-text">{userName}</div>
          </div>
          <div className="nav-item">
            <TopIcons />
          </div>
        </div>
      </nav>
    </div>
  );
};

const TopIcons = () => {
  const { Config } = useContext(GlobalContext);
  const { chatTopButtons } = Config.get(['chatTopButtons']);
  const { plain } = iconButtonSubType;
  const { below } = iconButtonToolTipPosition;
  const searchType = 'search';

  return chatTopButtons.map(({ type }, index) => {
    if (type === searchType) {
      return <TopSearch key={index.toString()} />;
    }

    return (
      <IconButton
        key={index.toString()}
        type={type}
        subtype={plain}
        toolTipPosition={below}
      />
    );
  });
};

const TopSearch = () => (
  <div className="nav-item">
    <div className="top-search">
      <input className="search-input" type="text" name="search" placeholder="Search" />
      <div className="svg svg-search" />
    </div>
  </div>
);

export default ChatTop;
