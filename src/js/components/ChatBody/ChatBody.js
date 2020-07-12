import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import '../../../scss/components/ChatBody/ChatBody.scss';
import ChatLogControl from '../ChatLogControl/ChatLogControl';
import { avatarClassNames } from '../GroupNavDMButton/GroupNavDMButton';

const ChatBody = ({ title, avatarSrc, backgroundColor }) => {
  const refChatBody = useRef(null);

  /**
   * Scroll to the bottom of the chat body
   */
  useEffect(() => {
    const { current } = refChatBody;
    current.scrollTo(0, current.scrollHeight);
  });

  /**
   * Resolves classes for the avatar
   * @returns {string}
   */
  const avatar = () => {
    const { baseAvatar, noAvatar, availableAvatar } = avatarClassNames;

    if (!avatarSrc) {
      return [baseAvatar, noAvatar, backgroundColor].join(' ');
    }
    return [baseAvatar, availableAvatar].join(' ');
  };

  return (
    <div className="chat-body" ref={refChatBody}>
      <div className="chat-log chat-log-spacer" />
      <div className="chat-log chat-log-head">
        <div className={avatar()} />
        <div className="log-head-title">{title}</div>
        <div className="log-head-text">
          This is the beginning of your direct message history with
          <strong>{` @${title}`}</strong>
        </div>
      </div>
      <ChatLogControl />
      <div className="chat-log chat-log-end" />
    </div>
  );
};

ChatBody.propTypes = {
  title: PropTypes.string,
  avatarSrc: PropTypes.string,
  backgroundColor: PropTypes.string,
};

ChatBody.defaultProps = {
  title: null,
  avatarSrc: null,
  backgroundColor: null,
};

export default ChatBody;
