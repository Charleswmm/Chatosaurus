import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatView/ChatView.scss';
import ChatTop from '../ChatTop/ChatTop';

const ChatView = (props) => {
  const { button: { id, title } } = props;

  return (
    <main className="chat">
      <ChatTop id={id} title={title} />
      <div className="chat-body" />
      <div className="chat-foot" />
    </main>
  );
};

ChatView.propTypes = {
  button: PropTypes.objectOf(PropTypes.string),
};

ChatView.defaultProps = {
  button: null,
};

export default ChatView;
