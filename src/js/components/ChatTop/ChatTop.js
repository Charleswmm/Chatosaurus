import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import '../../../scss/components/ChatTop/ChatTop.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import IconButton, { iconButtonSubType, iconButtonToolTipPosition } from '../IconButton/IconButton';

const ChatTop = (props) => {
  const { title } = props;

  return (
    <div className="chat-top">
      <nav className="nav-row">
        <div className="nav-group">
          <div className="nav-item flex-grow">
            <div className="svg svg-people" />
            <div className="nav-text">{title}</div>
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
  title: PropTypes.string,
};

ChatTop.defaultProps = {
  title: null,
};

export default ChatTop;
