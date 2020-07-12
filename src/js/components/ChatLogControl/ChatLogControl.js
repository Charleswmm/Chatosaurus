import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import ChatLogItem, { ChatLogItemDateDivider, ChatLogItemStart } from '../ChatLogItem/ChatLogItem';

const ChatLogControl = () => {
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['messageLog', 'currentUser', 'initialTimeStamp']);
  const { messageLog, currentUser, initialTimeStamp } = config;
  const { UserName, avatar } = currentUser;
  let prevTimeStamp = new Date(initialTimeStamp);

  // The interval in minutes in which how the chat log will be grouped
  const chatLogGroupInterval = 10;

  if (!messageLog) {
    // eslint-disable-next-line no-console
    console.log('Error: No Message Log Found');
    return <div className="no-message-log" />;
  }

  if (!messageLog.length) {
    return (
      <div className="chat-log-empty" />
    );
  }

  /**
   * Sort the message log into chronological order
   */
  messageLog.sort((a, b) => {
    if (a.timeStamp < b.timeStamp) {
      return -1;
    }
    if (a.timeStamp > b.timeStamp) {
      return 1;
    }
    return 0;
  });

  const alteredMessageLog = [];

  /**
   * Push a new divider object into the message log where required
   */
  messageLog.forEach((messageData) => {
    const { timeStamp } = messageData;
    const logItemDate = new Date(timeStamp);
    logItemDate.setHours(0, 0, 0, 0);

    if (logItemDate > prevTimeStamp) {
      alteredMessageLog.push({
        divider: true,
        timeStamp: logItemDate.toISOString(),
      });
    }

    alteredMessageLog.push(messageData);
    prevTimeStamp = logItemDate;
  });

  prevTimeStamp = new Date(initialTimeStamp);

  return alteredMessageLog.map((messageData, index) => {
    const {
      name, timeStamp, body, divider,
    } = messageData;

    if (divider) {
      return (
        <ChatLogItemDateDivider
          key={index.toString()}
          timeStamp={timeStamp}
        />
      );
    }

    const timeStampDateObj = new Date(timeStamp);

    if (prevTimeStamp < timeStampDateObj) {
      timeStampDateObj.setMinutes(timeStampDateObj.getMinutes() + chatLogGroupInterval);
      prevTimeStamp = timeStampDateObj;

      const avatarSrc = UserName === name ? avatar : null;

      return (
        <ChatLogItemStart
          key={index.toString()}
          userName={name}
          avatarSrc={avatarSrc}
          body={body}
          timeStamp={timeStamp}
        />
      );
    }

    timeStampDateObj.setMinutes(timeStampDateObj.getMinutes() + chatLogGroupInterval);
    prevTimeStamp = timeStampDateObj;

    return (
      <ChatLogItem
        key={index.toString()}
        timeStamp={timeStamp}
        body={body}
      />
    );
  });
};

export default ChatLogControl;
