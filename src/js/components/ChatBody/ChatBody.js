import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatBody/ChatBody.scss';

const ChatBody = (props) => {
  const { title } = props;

  return (
    <div className="chat-body">
      <div className="chat-log-head" />
      <div className="chat-log-item" />

      <div className="chat-test">This is test text</div>
    </div>
  );
};

export default ChatBody;
