import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatTopBar/ChatTopBar.scss';

const ChatTopBar = (props) => {
  const { title } = props;

  return (
    <div className="chat-top">
      <nav className="nav-row">
        <div className="nav-group">
          <div className="nav-item">
            <div className="svg svg-people" />
            <div className="nav-text">{title}</div>
          </div>
          <div className="nav-item flex-grow" />
          <div className="nav-item" />
          <div className="nav-item" />
          <div className="nav-item" />
          <div className="nav-item" />
        </div>
      </nav>
    </div>
  );
};

ChatTopBar.propTypes = {
  title: PropTypes.string,
};

ChatTopBar.defaultProps = {
  title: null,
};

export default ChatTopBar;
