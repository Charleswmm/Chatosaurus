import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatView/ChatView.scss';
import ChatTop from '../ChatTop/ChatTop';

const ChatView = (props) => {
  const { id, title } = props;

  return (
    <main className="chat">
      <ChatTop id={id} title={title} />
      <div className="chat-body" />
      <div className="chat-foot" />
    </main>
  );
};

ChatView.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};

ChatView.defaultProps = {
  id: null,
  title: null,
};

export default ChatView;
