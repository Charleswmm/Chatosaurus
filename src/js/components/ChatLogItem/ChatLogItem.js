import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatLogItem/ChatLogItem.scss';
import moment from 'moment';

/**
 * Formats an ISO string to "Tuesday, July 7, 2020 07:15 PM"
 * @param timeStamp
 * @returns {string}
 */
const formatDate = (timeStamp) => moment(timeStamp).format('dddd, MMMM D, YYYY h:mm A');

/**
 * Formats an ISO string to "07:15 PM"
 * @param timeStamp
 * @returns {string}
 */
const formatTime = (timeStamp) => moment(timeStamp).format('h:mm A');

/**
 * Formats an ISO string to "July 7, 2020"
 * @param timeStamp
 * @returns {string}
 */
const formatDividerDate = (timeStamp) => moment(timeStamp).format('MMMM D, YYYY');

/**
 * Formats an ISO string depending on today's time
 * @param timeStamp
 * @returns {string}
 */
const formatTimeStamp = (timeStamp) => {
  const todayDate = moment();
  const logItemTimeStamp = moment(timeStamp);

  if (logItemTimeStamp.isSame(todayDate, 'day')) {
    return `Today at ${formatTime(timeStamp)}`;
  }

  todayDate.subtract(1, 'day');

  if (logItemTimeStamp.isSame(todayDate, 'day')) {
    return `Yesterday at ${formatTime(timeStamp)}`;
  }

  return moment(logItemTimeStamp).format('DD/MM/YYYY');
};

const ChatLogItem = ({ timeStamp, body }) => (
  <div className="chat-log-item chat-log-item-message">
    <div className="message-tab">
      <div className="message-time">
        <span>{formatTime(timeStamp)}</span>
        <div className="message-tool-tip">
          <div className="tool-tip tool-tip-sm">
            <div className="tool-tip-text">{formatDate(timeStamp)}</div>
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
    <div className="chat-log-item chat-log-item-message chat-log-item-start">
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
                <div className="tool-tip-text">{formatDate(timeStamp)}</div>
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
  <div className="chat-log-item chat-log-item-divider">
    <div className="log-divider-line" />
    <div className="log-divider-date">{formatDividerDate(timeStamp)}</div>
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
