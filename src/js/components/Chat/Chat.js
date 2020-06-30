import React from 'react';
import '../../../scss/components/Chat/Chat.scss';

function Chat() {
  return (
    <main className="chat">
      <div className="chat-top">
        <nav className="nav-top">
          <div className="nav-group nav-group-top">
            <div className="nav-item" />
            <div className="nav-item flex-grow" />
            <div className="nav-item" />
            <div className="nav-item" />
            <div className="nav-item" />
            <div className="nav-item" />
          </div>
        </nav>
      </div>
      <div className="chat-body">
        <div className="svg svg-wumpus" />
      </div>
      <div className="chat-foot" />
    </main>
  );
}

export default Chat;
