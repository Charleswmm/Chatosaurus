import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatView/ChatView.scss';
import ChatBody from '../ChatBody/ChatBody';
import ChatFoot from '../ChatFoot/ChatFoot';
import ChatTop from '../ChatTop/ChatTop';

const ChatView = (props) => {
  const {
    id,
    title,
    avatarSrc,
    backgroundColor,
  } = props;

  return (
    <main className="chat">
      <ChatTop />
      <ChatBody
        id={id}
        title={title}
        avatarSrc={avatarSrc}
        backgroundColor={backgroundColor}
      />
      <ChatFoot id={id} title={title} />
    </main>
  );
};

ChatView.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  avatarSrc: PropTypes.string,
  backgroundColor: PropTypes.string,
};

ChatView.defaultProps = {
  id: null,
  title: null,
  avatarSrc: null,
  backgroundColor: null,
};

export default ChatView;
