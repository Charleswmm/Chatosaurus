import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatTop/ChatTop.scss';

const ChatTop = (props) => {
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

ChatTop.propTypes = {
  title: PropTypes.string,
};

ChatTop.defaultProps = {
  title: null,
};

export default ChatTop;
