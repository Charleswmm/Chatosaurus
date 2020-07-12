import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import ChatLogItem, { ChatLogItemDateDivider, ChatLogItemStart } from '../ChatLogItem/ChatLogItem';

const ChatLogControl = () => {
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['messageLog', 'currentUser']);
  const { messageLog, currentUser } = config;
  const { UserName, avatar } = currentUser;

  // The interval in seconds in which how the chat log will be grouped
  const chatLogGroupInterval = 600;

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
  messageLog.forEach((messageData, index) => {
    const { timeStamp } = messageData;
    let prevTimeStamp = 0;

    if (index) {
      prevTimeStamp = messageLog[index - 1].timeStamp;
    }

    const logItemDate = new Date(timeStamp);
    logItemDate.setHours(0, 0, 0, 0);

    const prevDate = new Date(prevTimeStamp);
    prevDate.setHours(0, 0, 0, 0);

    if (logItemDate > prevDate) {
      alteredMessageLog.push({
        divider: true,
        timeStamp: logItemDate.toISOString(),
      });
    }

    alteredMessageLog.push(messageData);
  });

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

    let prevTimeStamp = 0;

    if (index) {
      prevTimeStamp = alteredMessageLog[index - 1].timeStamp;
    }

    const logItemDate = new Date(timeStamp);
    const prevDateTime = new Date(prevTimeStamp);
    const breakPoint = new Date(prevDateTime.getTime() + chatLogGroupInterval * 1000);

    if (logItemDate > breakPoint) {
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
