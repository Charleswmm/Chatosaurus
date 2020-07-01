import React from 'react';
import '../../../scss/components/Chat/Chat.scss';
import ChatTopBar from '../ChatTopBar/ChatTopBar';

function Chat() {
  return (
    <main className="chat">
      <ChatTopBar />
      <div className="chat-body">
        <div className="svg svg-wumpus" />
      </div>
      <div className="chat-foot" />
    </main>
  );
}

export default Chat;
