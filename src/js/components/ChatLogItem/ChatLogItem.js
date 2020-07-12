import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatLogItem/ChatLogItem.scss';

/**
 * Formats a ISO string to "Tuesday, July 7, 2020"
 * @param timeStamp
 * @returns {string}
 */
const formatDate = (timeStamp) => new Date(timeStamp).toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

/**
 * Formats a ISO string to "07:15 PM"
 * @param timeStamp
 * @returns {string}
 */
const formatTime = (timeStamp) => new Date(timeStamp).toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
});

/**
 * Formats a ISO string to "July 7, 2020"
 * @param timeStamp
 * @returns {string}
 */
const formatDividerDate = (timeStamp) => new Date(timeStamp).toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

/**
 * Formats a ISO string depending on today's time
 * @param timeStamp
 * @returns {string}
 */
const formatTimeStamp = (timeStamp) => {
  const todayDate = new Date();
  const logItemTimeStamp = new Date(timeStamp);

  if (todayDate.toDateString() === logItemTimeStamp.toDateString()) {
    return `Today at ${formatTime(timeStamp)}`;
  }

  todayDate.setDate(todayDate.getDate() - 1);

  if (todayDate.toDateString() === logItemTimeStamp.toDateString()) {
    return `Yesterday at ${formatTime(timeStamp)}`;
  }

  return logItemTimeStamp.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const ChatLogItem = ({ timeStamp, body }) => (
  <div className="chat-log chat-log-item">
    <div className="message-tab">
      <div className="message-time">
        <span>{formatTime(timeStamp)}</span>
        <div className="message-tool-tip">
          <div className="tool-tip tool-tip-sm">
            <div className="tool-tip-text">{`${formatDate(timeStamp)} ${formatTime(timeStamp)}`}</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </div>
      </div>
    </div>
    <div className="message-content">
      <div className="message-text">{body}</div>
    </div>
    <ChatLogItemActions />
  </div>
);

export const ChatLogItemStart = (props) => {
  const {
    timeStamp, userName, avatarSrc, body,
  } = props;

  return (
    <div className="chat-log chat-log-item chat-log-item-start">
      <div className="message-tab">
        <div className="avatar" style={{ backgroundImage: `url(${avatarSrc})` }} />
      </div>
      <div className="message-content">
        <div className="message-title">
          <div className="message-user">{userName}</div>
          <div className="message-time">
            <span>{formatTimeStamp(timeStamp)}</span>
            <div className="message-tool-tip">
              <div className="tool-tip tool-tip-sm">
                <div className="tool-tip-text">{`${formatDate(timeStamp)} ${formatTime(timeStamp)}`}</div>
                <div className="tool-tip-arrow tool-tip-arrow-bottom" />
              </div>
            </div>
          </div>
        </div>
        <div className="message-text">{body}</div>
      </div>
      <ChatLogItemActions />
    </div>
  );
};

export const ChatLogItemDateDivider = ({ timeStamp }) => (
  <div className="chat-log chat-log-divider">
    <div className="log-divider-line" />
    <div className="log-divider-day">{formatDividerDate(timeStamp)}</div>
    <div className="log-divider-line" />
  </div>
);

const ChatLogItemActions = () => (
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
);

ChatLogItem.propTypes = {
  timeStamp: PropTypes.string,
  body: PropTypes.string,
};

ChatLogItem.defaultProps = {
  timeStamp: null,
  body: null,
};

ChatLogItemStart.propTypes = {
  timeStamp: PropTypes.string,
  userName: PropTypes.string,
  avatarSrc: PropTypes.string,
  body: PropTypes.string,
};

ChatLogItemStart.defaultProps = {
  timeStamp: null,
  userName: null,
  avatarSrc: null,
  body: null,
};

ChatLogItemDateDivider.propTypes = {
  timeStamp: PropTypes.string,
};

ChatLogItemDateDivider.defaultProps = {
  timeStamp: null,
};

export default ChatLogItem;
