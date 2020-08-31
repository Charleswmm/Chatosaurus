import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';
import '../../../scss/components/ChatBody/ChatBody.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import ChatLogControl from '../ChatLogControl/ChatLogControl';
import { avatarClassNames as avatarClasses } from '../GroupNavDMButton/GroupNavDMButton';

const ChatBody = (props) => {
  const { id, name, avatarSrc, backgroundColor, type } = props;

  const { Config } = useContext(GlobalContext);
  const config = Config.get(['discordAPIResources', 'channelNavButtonClasses', 'chatHeadText']);
  const { channelNavButtonClasses, discordAPIResources: { dmChannel }, chatHeadText } = config;
  const { svgBase, svgHashWhite } = channelNavButtonClasses;
  const { dmText, channelText } = chatHeadText;

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
  const iconClassNames = () => {
    const { baseClass, noAvatar, availableAvatar } = avatarClasses;

    if (type !== dmChannel) {
      return [baseClass, svgBase, svgHashWhite, backgroundColor].join(' ');
    }

    if (!avatarSrc) {
      return [baseClass, noAvatar, backgroundColor].join(' ');
    }
    return [baseClass, availableAvatar].join(' ');
  };

  const titleMessage = () => {
    if (type !== dmChannel) {
      return `Welcome to #${name}`;
    }
    return name;
  };

  const textMessage = () => {
    if (type !== dmChannel) {
      return `${channelText}${name} channel`;
    }
    return (
      <>
        {dmText}
        <strong>{`@${name}`}</strong>
      </>
    );
  };

  return (
    <div className="chat-body" ref={refChatBody}>
      <div className="chat-log-item chat-log-item-spacer" />
      <div className="chat-log-item chat-log-item-head">
        <div className={iconClassNames()} />
        <div className="log-head-title">{titleMessage()}</div>
        <div className="log-head-text">{textMessage()}</div>
      </div>
      <ChatLogControl id={id} type={type} />
      <div className="chat-log-item chat-log-item-end" />
    </div>
  );
};

ChatBody.propTypes = {
  id: PropTypes.string,
  type: PropTypes.number,
  name: PropTypes.string,
  avatarSrc: PropTypes.string,
  backgroundColor: PropTypes.string,
};

ChatBody.defaultProps = {
  id: null,
  type: null,
  name: null,
  avatarSrc: null,
  backgroundColor: null,
};

export default ChatBody;
