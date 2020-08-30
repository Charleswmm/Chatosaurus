import PropTypes from 'prop-types';
import React, { useContext, useRef } from 'react';
import '../../../scss/components/ChatFoot/ChatFoot.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import IconButton, {
  iconButtonSubType,
  iconButtonToolTipPosition,
  iconButtonType,
} from '../IconButton/IconButton';

const ChatFoot = ({ id, name, type }) => {
  const { addAttachment, addGift, addGif, addEmoji } = iconButtonType;
  const { plain } = iconButtonSubType;
  const { above } = iconButtonToolTipPosition;

  return (
    <div className="chat-foot">
      <div className="chat-foot-content">
        <form className="chat-form">
          <IconButton
            type={addAttachment}
            subtype={plain}
          />
          <ChatInput
            id={id}
            name={name}
            type={type}
          />
          <IconButton
            type={addGift}
            subtype={plain}
            toolTipPosition={above}
          />
          <IconButton
            type={addGif}
            subtype={plain}
          />
          <IconButton
            type={addEmoji}
            subtype={plain}
          />
        </form>
      </div>
    </div>
  );
};

const ChatInput = ({ id, name, type }) => {
  const { state: { unSentMessage }, setChatInputState, Config } = useContext(GlobalContext);
  const { discordAPIResources: { dmChannel } } = Config.get(['discordAPIResources']);

  const refInput = useRef(null);

  let placeholderMessage = `@${name}`;

  if (type !== dmChannel) {
    placeholderMessage = `#${name}`;
  }

  const maxNumberOfLines = 6;
  const inputLineHeight = 22;
  let chatInput = '';

  const findUnSentMessage = unSentMessage.find((e) => e.chatId === id);

  if (findUnSentMessage) {
    chatInput = findUnSentMessage.chatInput;
  }

  const numberOfLines = chatInput.split('\n').length;
  let inputHeight = inputLineHeight * numberOfLines;

  if (numberOfLines >= maxNumberOfLines) {
    inputHeight = inputLineHeight * maxNumberOfLines;
  }

  /**
   * Set the state with each key stroke
   * @param evt
   */
  const setChatInput = (evt) => {
    setChatInputState(id, evt.target.value);
  };

  return (
    <textarea
      name="chatInput"
      className="chat-textarea flex-grow"
      style={{
        height: `${inputHeight}px`,
      }}
      placeholder={`Message ${placeholderMessage}`}
      value={chatInput}
      onChange={setChatInput}
      ref={refInput}
    />
  );
};

ChatFoot.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.number,
};

ChatFoot.defaultProps = {
  id: null,
  name: null,
  type: null,
};

ChatInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.number,
};

ChatInput.defaultProps = {
  id: null,
  name: null,
  type: null,
};

export default ChatFoot;
