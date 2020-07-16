import moment from 'moment';
import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import ChatLogItem, { ChatLogItemDateDivider, ChatLogItemStart } from '../ChatLogItem/ChatLogItem';

const ChatLogControl = ({ id }) => {
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['currentUser', 'chatRoomMessageLog']);
  const { currentUser, chatRoomMessageLog } = config;
  const { userName, avatar } = currentUser;

  const findChatRoomMessageLog = chatRoomMessageLog.find((e) => e.chatRoomId === id);

  let messageLog;

  if (findChatRoomMessageLog) {
    messageLog = findChatRoomMessageLog.messageLog;
  }

  // The interval in seconds in which how the chat log will be grouped
  const chatLogGroupInterval = 600;

  if (!messageLog) {
    // eslint-disable-next-line no-console
    console.log('Error: No Message Log Found');
    return <div className="no-message-log" />;
  }

  if (messageLog.length < 1) {
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

    const logItemDate = moment(timeStamp).startOf('day');
    const prevDate = moment(prevTimeStamp).startOf('day');

    if (logItemDate.isAfter(prevDate)) {
      alteredMessageLog.push({
        divider: true,
        timeStamp: logItemDate.format(),
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

    const logItemDate = moment(timeStamp);
    const breakPoint = moment(prevTimeStamp).add(chatLogGroupInterval, 'seconds');

    if (logItemDate.isAfter(breakPoint)) {
      const avatarSrc = userName === name ? avatar : null;

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
