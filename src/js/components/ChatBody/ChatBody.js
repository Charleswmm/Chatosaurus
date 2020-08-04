import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import '../../../scss/components/ChatBody/ChatBody.scss';
import ChatLogControl from '../ChatLogControl/ChatLogControl';
import { avatarClassNames as avatarClasses } from '../GroupNavDMButton/GroupNavDMButton';

const ChatBody = (props) => {
  const { id, title, avatarSrc, backgroundColor } = props;

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
  const avatarClassNames = () => {
    const { baseAvatar, noAvatar, availableAvatar } = avatarClasses;

    if (!avatarSrc) {
      return [baseAvatar, noAvatar, backgroundColor].join(' ');
    }
    return [baseAvatar, availableAvatar].join(' ');
  };

  return (
    <div className="chat-body" ref={refChatBody}>
      <div className="chat-log-item chat-log-item-spacer" />
      <div className="chat-log-item chat-log-item-head">
        <div className={avatarClassNames()} />
        <div className="log-head-title">{title}</div>
        <div className="log-head-text">
          This is the beginning of your direct message history with&nbsp;
          <strong>{`@${title}`}</strong>
        </div>
      </div>
      <ChatLogControl id={id} />
      <div className="chat-log-item chat-log-item-end" />
    </div>
  );
};

ChatBody.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  avatarSrc: PropTypes.string,
  backgroundColor: PropTypes.string,
};

ChatBody.defaultProps = {
  id: null,
  title: null,
  avatarSrc: null,
  backgroundColor: null,
};

export default ChatBody;
