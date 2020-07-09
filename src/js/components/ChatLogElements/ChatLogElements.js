import PropTypes from 'prop-types';
import React from 'react';
import ChatLogItems from '../ChatLogItems/ChatLogItems';
import '../../../scss/components/ChatLogElements/ChatLogElements.scss';

const ChatLogElements = ({ messageIds }) => {
  const randomElements = Math.floor(Math.random() * 2 + 1);
  const randomElementsArray = new Array(randomElements).fill(1, 0, randomElements);

  return randomElementsArray.map((element, index) => (
    <ChatLogElement
      key={index.toString()}
      messageIds={messageIds}
    />
  ));
};

const ChatLogElement = ({ messageIds }) => (
  <div className="chat-log-element">
    <ChatLogItems messageIds={messageIds} />
  </div>
);

ChatLogElement.propTypes = {
  messageIds: PropTypes.arrayOf(PropTypes.string),
};

ChatLogElement.defaultProps = {
  messageIds: null,
};

export default ChatLogElements;
