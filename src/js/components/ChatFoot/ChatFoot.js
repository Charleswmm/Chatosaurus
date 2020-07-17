import PropTypes from 'prop-types';
import React, { useContext, useRef } from 'react';
import '../../../scss/components/ChatFoot/ChatFoot.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import IconButton, {
  iconButtonSubType,
  iconButtonToolTipPosition,
  iconButtonType,
} from '../IconButton/IconButton';

const ChatFoot = (props) => {
  const { id, title } = props;
  const {
    addAttachment, addGift, addGif, addEmoji,
  } = iconButtonType;
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
          <ChatInput id={id} title={title} />
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

const ChatInput = (props) => {
  const { id, title } = props;
  const { state: { unSentMessage }, setChatInputState } = useContext(GlobalContext);
  const refInput = useRef(null);

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
      style={{ height: `${inputHeight}px` }}
      placeholder={`Message @${title}`}
      value={chatInput}
      onChange={setChatInput}
      ref={refInput}
    />
  );
};

ChatFoot.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};

ChatFoot.defaultProps = {
  id: null,
  title: null,
};

ChatInput.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};

ChatInput.defaultProps = {
  id: null,
  title: null,
};

export default ChatFoot;
