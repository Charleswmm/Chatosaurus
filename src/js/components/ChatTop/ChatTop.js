import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import '../../../scss/components/ChatTop/ChatTop.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import IconButton, { iconButtonSubType, iconButtonToolTipPosition } from '../IconButton/IconButton';

const ChatTop = ({ name, type }) => {
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['channelNavButtonClasses', 'discordAPIResources']);
  const { channelNavButtonClasses, discordAPIResources: { dmChannel } } = config;
  const { svgBase, svgHash, svgPeople } = channelNavButtonClasses;

  const iconClass = () => {
    if (type !== dmChannel) {
      return [svgBase, svgHash].join(' ');
    }
    return [svgBase, svgPeople].join(' ');
  };

  return (
    <div className="chat-top">
      <nav className="nav-row">
        <div className="nav-group">
          <div className="nav-item flex-grow">
            <div className={iconClass()} />
            <div className="nav-text">{name}</div>
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

ChatTop.propTypes = {
  type: PropTypes.number,
  name: PropTypes.string,
};

ChatTop.defaultProps = {
  type: null,
  name: null,
};

export default ChatTop;
