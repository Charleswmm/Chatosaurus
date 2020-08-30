import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatView/ChatView.scss';
import ChatBody from '../ChatBody/ChatBody';
import ChatFoot from '../ChatFoot/ChatFoot';
import ChatTop from '../ChatTop/ChatTop';

const ChatView = (props) => {
  const { id, name, avatarSrc, backgroundColor, type } = props;

  return (
    <main className="chat">
      <ChatTop
        name={name}
        type={type}
      />
      <ChatBody
        id={id}
        type={type}
        name={name}
        avatarSrc={avatarSrc}
        backgroundColor={backgroundColor}
      />
      <ChatFoot
        id={id}
        name={name}
        type={type}
      />
    </main>
  );
};

ChatView.propTypes = {
  id: PropTypes.string,
  type: PropTypes.number,
  name: PropTypes.string,
  avatarSrc: PropTypes.string,
  backgroundColor: PropTypes.string,
};

ChatView.defaultProps = {
  id: null,
  type: null,
  name: null,
  avatarSrc: null,
  backgroundColor: null,
};

export default ChatView;
