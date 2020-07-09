import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import '../../../scss/components/ChatLogItems/ChatLogItems.scss';

const ChatLogItems = ({ messageIds }) => {
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

  return (
    <div className="chat-log-item">
      <ChatLogItemSelect
        name={name}
        message={message}
        avatarSrc={avatarSrc}
        messageOrder={messageOrder}
      />
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

const ChatLogItemSelect = (props) => {
  const {
    name,
    avatarSrc,
    messageOrder,
    message,
  } = props;

  if (!messageOrder) {
    return <ChatLogItemFirst name={name} message={message} avatarSrc={avatarSrc} />;
  }
  return <ChatLogItemRemainder message={message} />;
};

const ChatLogItemFirst = ({ name, message, avatarSrc }) => (
  <>
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
  </>
);

const ChatLogItemRemainder = ({ message }) => (
  <>
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
  </>
);

ChatLogItem.propTypes = {
  name: PropTypes.string,
  avatarSrc: PropTypes.string,
  messageOrder: PropTypes.number,
  message: PropTypes.string,
};

ChatLogItem.defaultProps = {
  name: null,
  avatarSrc: null,
  messageOrder: null,
  message: null,
};

ChatLogItemSelect.propTypes = {
  name: PropTypes.string,
  avatarSrc: PropTypes.string,
  messageOrder: PropTypes.number,
  message: PropTypes.string,
};

ChatLogItemSelect.defaultProps = {
  name: null,
  avatarSrc: null,
  messageOrder: null,
  message: null,
};

ChatLogItemFirst.propTypes = {
  name: PropTypes.string,
  avatarSrc: PropTypes.string,
  message: PropTypes.string,
};

ChatLogItemFirst.defaultProps = {
  name: null,
  avatarSrc: null,
  message: null,
};

ChatLogItemRemainder.propTypes = {
  message: PropTypes.string,
};

ChatLogItemRemainder.defaultProps = {
  message: null,
};

export default ChatLogItems;
