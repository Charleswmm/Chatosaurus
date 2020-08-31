import moment from 'moment';
import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import useDiscordData from '../../hooks/useDiscordData';
import ChatLogItem, { ChatLogItemDateDivider, ChatLogItemStart } from '../ChatLogItem/ChatLogItem';

const ChatLogControl = ({ id, type }) => {
  const { Config } = useContext(GlobalContext);
  const config = Config.get(['currentUser', 'chatRoomMessageLog', 'discordAPIResources', 'discordUrls']);

  const { currentUser, chatRoomMessageLog, discordAPIResources, discordUrls } = config;
  const { channels, messages, dmChannel, pending, avatarPath } = discordAPIResources;
  const { userName: currentUserName, avatar: currentUserAvatar } = currentUser;
  const { appCDN } = discordUrls;

  const chatStatus = type === dmChannel ? pending : id;
  const channelMessagesResource = [channels, chatStatus, messages].join('/');

  const channelMessages = useDiscordData(channelMessagesResource);

  let messageLog = [];

  if (channelMessages) {
    messageLog = channelMessages.filter((message) => message.type === 0);
  }

  const findChatRoomMessageLog = chatRoomMessageLog.find((e) => e.chatRoomId === id);

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
    if (a.timestamp < b.timestamp) {
      return -1;
    }
    if (a.timestamp > b.timestamp) {
      return 1;
    }
    return 0;
  });

  const alteredMessageLog = [];

  /**
   * Push a new divider object into the message log where required
   */
  messageLog.forEach((messageData, index) => {
    const { timestamp } = messageData;
    let prevTimestamp = 0;

    if (index) {
      prevTimestamp = messageLog[index - 1].timestamp;
    }

    const logItemDate = moment(timestamp).startOf('day');
    const prevDate = moment(prevTimestamp).startOf('day');

    if (logItemDate.isAfter(prevDate)) {
      alteredMessageLog.push({
        divider: true,
        timestamp: logItemDate.format(),
      });
    }

    alteredMessageLog.push(messageData);
  });

  return alteredMessageLog.map((messageData, index) => {
    const { name, timestamp, content, divider, author } = messageData;

    if (divider) {
      return (
        <ChatLogItemDateDivider
          key={index.toString()}
          timestamp={timestamp}
        />
      );
    }

    let prevTimestamp = 0;

    if (index) {
      prevTimestamp = alteredMessageLog[index - 1].timestamp;
    }

    const logItemDate = moment(timestamp);
    const breakPoint = moment(prevTimestamp).add(chatLogGroupInterval, 'seconds');

    if (logItemDate.isAfter(breakPoint)) {
      let userName = name;
      let avatarUrl = currentUserName === userName ? currentUserAvatar : null;

      if (author) {
        const { avatar, username, id: userId } = author;
        avatarUrl = avatar ? [appCDN, avatarPath, userId, avatar].join('/') : currentUserAvatar;
        userName = username;
      }

      return (
        <ChatLogItemStart
          key={index.toString()}
          userName={userName}
          avatarSrc={avatarUrl}
          content={content}
          timestamp={timestamp}
        />
      );
    }

    return (
      <ChatLogItem
        key={index.toString()}
        timestamp={timestamp}
        content={content}
      />
    );
  });
};

export default ChatLogControl;
