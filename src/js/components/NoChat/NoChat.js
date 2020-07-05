import React from 'react';
import '../../../scss/components/NoChat/NoChat.scss';

const NoChat = () => (
  <main className="no-chat">
    <div className="svg svg-no-chat" />
    <div className="chat-text">No Text Channels</div>
    <div className="chat-subtext">
      You find yourself in a strange place. You don&apos;t have access to any text channels,
      or there are none in this server.
    </div>
  </main>
);

export default NoChat;
