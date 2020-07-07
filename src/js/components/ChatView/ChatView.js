import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatView/ChatView.scss';
import ChatBody from '../ChatBody/ChatBody';
import ChatFoot from '../ChatFoot/ChatFoot';
import ChatTop from '../ChatTop/ChatTop';

const ChatView = (props) => {
  const { id, title } = props;

  return (
    <main className="chat">
      <ChatTop id={id} title={title} />
      <ChatBody title={title} />
      <ChatFoot title={title} />
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
