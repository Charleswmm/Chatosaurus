import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatTop/ChatTop.scss';

const topButtons = [
  {
    iconClass: 'svg svg-voice-call',
    tip: 'Start Voice Call',
  },
  {
    iconClass: 'svg svg-video-call',
    tip: 'Start Video Call',
  },
  {
    iconClass: 'svg svg-pin',
    tip: 'Pinned Messages',
  },
  {
    iconClass: 'svg svg-add-friend',
    tip: 'Add Friends to DM',
  },
  {
    iconClass: 'svg svg-people',
    tip: 'Member List',
  },
  {
    search: true,
  },
  {
    iconClass: 'svg svg-inbox',
    tip: 'Inbox',
  },
  {
    iconClass: 'svg svg-help',
    tip: 'Help',
  },
];

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
          <TopButtons />
        </div>
      </nav>
    </div>
  );
};

const TopButtons = () => topButtons.map(({ iconClass, tip, search }, index) => {
  if (search) {
    return <TopSearch key={index.toString()} />;
  }

  return <TopButton key={index.toString()} iconClass={iconClass} tip={tip} />;
});

export const TopButton = ({ iconClass, tip }) => (
  <div className="nav-item">
    <button className="top-btn" type="button">
      <div className={iconClass} />
    </button>
    <div className="sm-tool-tip">
      <div className="tool-tip-arrow tool-tip-arrow-top" />
      <div className="tool-tip-text">{tip}</div>
    </div>
  </div>
);

const TopSearch = () => (
  <div className="nav-item">
    <div className="top-search">
      <input className="search-input" type="text" name="search" defaultValue="Search" />
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

TopButton.propTypes = {
  iconClass: PropTypes.string,
  tip: PropTypes.string,
};

TopButton.defaultProps = {
  iconClass: null,
  tip: null,
};

export default ChatTop;
