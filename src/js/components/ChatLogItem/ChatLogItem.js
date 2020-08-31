import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/ChatLogItem/ChatLogItem.scss';
import moment from 'moment';
import IconButton, {
  iconButtonSubType,
  iconButtonToolTipPosition,
  iconButtonType,
} from '../IconButton/IconButton';

/**
 * Formats an ISO string to "Tuesday, July 7, 2020 07:15 PM"
 * @param timestamp
 * @returns {string}
 */
const formatDate = (timestamp) => moment(timestamp).format('dddd, MMMM D, YYYY h:mm A');

/**
 * Formats an ISO string to "07:15 PM"
 * @param timestamp
 * @returns {string}
 */
const formatTime = (timestamp) => moment(timestamp).format('h:mm A');

/**
 * Formats an ISO string to "July 7, 2020"
 * @param timestamp
 * @returns {string}
 */
const formatDividerDate = (timestamp) => moment(timestamp).format('MMMM D, YYYY');

/**
 * Formats an ISO string depending on today's time
 * @param timestamp
 * @returns {string}
 */
const formatTimeStamp = (timestamp) => {
  const todayDate = moment();
  const logItemTimeStamp = moment(timestamp);

  if (logItemTimeStamp.isSame(todayDate, 'day')) {
    return `Today at ${formatTime(timestamp)}`;
  }

  todayDate.subtract(1, 'day');

  if (logItemTimeStamp.isSame(todayDate, 'day')) {
    return `Yesterday at ${formatTime(timestamp)}`;
  }

  return moment(logItemTimeStamp).format('DD/MM/YYYY');
};

const ChatLogItem = ({ timestamp, content }) => (
  <div className="chat-log-item chat-log-item-message">
    <div className="message-tab">
      <div className="message-time">
        <span>{formatTime(timestamp)}</span>
        <div className="message-tool-tip">
          <div className="tool-tip">
            <div className="tool-tip-text tool-tip-text-sm">{formatDate(timestamp)}</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </div>
      </div>
    </div>
    <div className="message-content">
      <div className="message-text">{content}</div>
    </div>
    <ChatLogItemActions />
  </div>
);

export const ChatLogItemStart = (props) => {
  const { timestamp, userName, avatarSrc, content } = props;

  return (
    <div className="chat-log-item chat-log-item-message chat-log-item-start">
      <div className="message-tab">
        <div
          className="avatar"
          style={{
            backgroundImage: `url(${avatarSrc})`,
          }}
        />
      </div>
      <div className="message-content">
        <div className="message-title">
          <div className="message-user">{userName}</div>
          <div className="message-time">
            <span>{formatTimeStamp(timestamp)}</span>
            <div className="message-tool-tip">
              <div className="tool-tip">
                <div className="tool-tip-text tool-tip-text-sm">{formatDate(timestamp)}</div>
                <div className="tool-tip-arrow tool-tip-arrow-bottom" />
              </div>
            </div>
          </div>
        </div>
        <div className="message-text">{content}</div>
      </div>
      <ChatLogItemActions />
    </div>
  );
};

export const ChatLogItemDateDivider = ({ timestamp }) => (
  <div className="chat-log-item chat-log-item-divider">
    <div className="log-divider-line" />
    <div className="log-divider-date">{formatDividerDate(timestamp)}</div>
    <div className="log-divider-line" />
  </div>
);

const ChatLogItemActions = () => {
  const { reaction, edit, more } = iconButtonType;
  const { rounded } = iconButtonSubType;
  const { above } = iconButtonToolTipPosition;

  return (
    <div className="message-actions">
      <IconButton
        type={reaction}
        subtype={rounded}
        toolTipPosition={above}
      />
      <IconButton
        type={edit}
        subtype={rounded}
        toolTipPosition={above}
      />
      <IconButton
        type={more}
        subtype={rounded}
        toolTipPosition={above}
      />
    </div>
  );
};

ChatLogItem.propTypes = {
  timestamp: PropTypes.string,
  content: PropTypes.string,
};

ChatLogItem.defaultProps = {
  timestamp: null,
  content: null,
};

ChatLogItemStart.propTypes = {
  timestamp: PropTypes.string,
  userName: PropTypes.string,
  avatarSrc: PropTypes.string,
  content: PropTypes.string,
};

ChatLogItemStart.defaultProps = {
  timestamp: null,
  userName: null,
  avatarSrc: null,
  content: null,
};

ChatLogItemDateDivider.propTypes = {
  timestamp: PropTypes.string,
};

ChatLogItemDateDivider.defaultProps = {
  timestamp: null,
};

export default ChatLogItem;
