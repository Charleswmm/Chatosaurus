import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';
import '../../../scss/components/ChatBody/ChatBody.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
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

const ChatBody = (props) => {
  const {
    title,
    avatarSrc,
    backgroundColor,
  } = props;

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
        <div className="divider" />
        <div className="date">July 7, 2020</div>
        <div className="divider" />
      </div>
      <ChatLogElement messageIds={messageIds} />
      <ChatLogElement messageIds={messageIds} />
    </div>
  );
};

const ChatLogElement = (props) => {
  const { messageIds } = props;

  return (
    <div className="chat-log-element">
      <ChatLogItems messageIds={messageIds} />
    </div>
  );
};

const ChatLogItems = (props) => {
  const { messageIds } = props;
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['chatLogPlaceholderText', 'userConfig']);
  const { chatLogPlaceholderText, userConfig } = config;
  const { name, avatar } = userConfig;

  return messageIds.map((messageId, index) => (
    <ChatLogItem
      key={index.toString()}
      name={name}
      avatarSrc={avatar}
      messageOrder={index}
      message={chatLogPlaceholderText[messageId]}
    />
  ));
};

const ChatLogItem = (props) => {
  const {
    name,
    avatarSrc,
    messageOrder,
    message,
  } = props;

  if (!messageOrder) {
    return (
      <div className="chat-log-item">
        <div className="message-tab">
          <div className="avatar" style={{ backgroundImage: `url(${avatarSrc})` }} />
        </div>
        <div className="message-content">
          <div className="message-title">
            <div className="message-user">{name}</div>
            <div className="message-time">
              <span>07/07/2020</span>
              <div className="tool-tip tool-tip-sm">
                <div className="tool-tip-text">Wednesday, July 8, 2020 10:09 AM</div>
                <div className="tool-tip-arrow tool-tip-arrow-bottom" />
              </div>
            </div>
          </div>
          <div className="message-text">{message}</div>
        </div>
        <div className="message-actions">
          <div className="message-action">
            <div className="svg svg-reaction" />
            <div className="tool-tip tool-tip-sm">
              <div className="tool-tip-text">Add Reaction</div>
              <div className="tool-tip-arrow tool-tip-arrow-bottom" />
            </div>
          </div>
          <div className="message-action">
            <div className="svg svg-edit" />
            <div className="tool-tip tool-tip-sm">
              <div className="tool-tip-text">Edit</div>
              <div className="tool-tip-arrow tool-tip-arrow-bottom" />
            </div>
          </div>
          <div className="message-action">
            <div className="svg svg-more" />
            <div className="tool-tip tool-tip-sm">
              <div className="tool-tip-text">More</div>
              <div className="tool-tip-arrow tool-tip-arrow-bottom" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-log-item">
      <div className="message-tab">
        <div className="message-time">
          <span>10:09 AM</span>
          <div className="tool-tip tool-tip-sm">
            <div className="tool-tip-text">Wednesday, July 8, 2020 10:09 AM</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </div>
      </div>
      <div className="message-content">
        <div className="message-text">{message}</div>
      </div>
      <div className="message-actions">
        <div className="message-action">
          <div className="svg svg-reaction" />
          <div className="tool-tip tool-tip-sm">
            <div className="tool-tip-text">Add Reaction</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </div>
        <div className="message-action">
          <div className="svg svg-edit" />
          <div className="tool-tip tool-tip-sm">
            <div className="tool-tip-text">Edit</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </div>
        <div className="message-action">
          <div className="svg svg-more" />
          <div className="tool-tip tool-tip-sm">
            <div className="tool-tip-text">More</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </div>
      </div>
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

ChatLogItem.propTypes = {
  first: PropTypes.bool,
};

ChatLogItem.defaultProps = {
  first: false,
};

export default ChatBody;
