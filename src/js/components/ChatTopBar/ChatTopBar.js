import React from 'react';
import '../../../scss/components/ChatTopBar/ChatTopBar.scss';

function ChatTopBar() {
  return (
    <div className="chat-top">
      <nav className="nav-row">
        <div className="nav-group">
          <div className="nav-item">
            <div className="svg svg-people" />
            <div className="nav-text">Unnamed</div>
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
}

export default ChatTopBar;
