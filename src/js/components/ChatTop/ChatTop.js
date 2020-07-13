import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import '../../../scss/components/ChatTop/ChatTop.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

const ChatTop = (props) => {
  const { title } = props;

  return (
    <div className="chat-top">
      <nav className="nav-row">
        <div className="nav-group">
          <div className="nav-item flex-grow">
            <div className="svg svg-people svg-people-grey" />
            <div className="nav-text">{title}</div>
          </div>
          <TopItems />
        </div>
      </nav>
    </div>
  );
};

const TopItems = () => {
  const { Config } = useContext(GlobalContext);
  const { chatTopButtons } = Config.get(['chatTopButtons']);
  const searchType = 'search';

  return chatTopButtons.map(({ iconClass, title, type }, index) => {
    if (type === searchType) {
      return <TopSearch key={index.toString()} />;
    }

    return <TopItem key={index.toString()} iconClass={iconClass} title={title} />;
  });
};

export const TopItem = ({ iconClass, title }) => (
  <div className="nav-item">
    <button className="top-btn" type="button">
      <div className={iconClass} />
    </button>
    <div className="tool-tip tool-tip-sm">
      <div className="tool-tip-arrow tool-tip-arrow-top" />
      <div className="tool-tip-text">{title}</div>
    </div>
  </div>
);

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

TopItem.propTypes = {
  iconClass: PropTypes.string,
  title: PropTypes.string,
};

TopItem.defaultProps = {
  iconClass: null,
  title: null,
};

export default ChatTop;
