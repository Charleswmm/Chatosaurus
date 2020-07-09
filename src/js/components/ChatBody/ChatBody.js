import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import '../../../scss/components/ChatBody/ChatBody.scss';
import ChatLogElements from '../ChatLogElements/ChatLogElements';
import { avatarClassNames } from '../GroupNavDMButton/GroupNavDMButton';

/**
 * Placeholder function to give a random list of message Ids
 * @returns {string[]}
 */
const randomMessageIds = () => {
  const numberOfLines = Math.floor(Math.random() * 9);
  const randomArray = [0, 1, 2, 3, 4, 0, 1, 2];
  randomArray.sort(() => Math.random() - 0.5);
  randomArray.splice(0, numberOfLines);
  return randomArray.map(String);
};

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
      <div className="chat-log-spacer" />
      <div className="chat-log-head">
        <div className={avatar()} />
        <div className="log-head-title">{title}</div>
        <div className="log-head-text">
          This is the beginning of your direct message history with
          <strong>{` @${title}`}</strong>
        </div>
      </div>
      <ChatLogDay />
      <div className="chat-log-end" />
    </div>
  );
};

const ChatLogDay = () => {
  const messageIds = randomMessageIds();

  if (!Array.isArray(messageIds) || !messageIds.length) {
    return (
      <div className="chat-log-empty" />
    );
  }

  return (
    <div className="chat-log-day">
      <div className="log-day-divider">
        <div className="log-day-line" />
        <div className="log-day-date">July 7, 2020</div>
        <div className="log-day-line" />
      </div>
      <ChatLogElements messageIds={messageIds} />
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
