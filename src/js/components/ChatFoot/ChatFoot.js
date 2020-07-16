import PropTypes from 'prop-types';
import React, { useContext, useRef } from 'react';
import '../../../scss/components/ChatFoot/ChatFoot.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

const ChatFoot = (props) => {
  const { id, title } = props;

  return (
    <div className="chat-foot">
      <div className="chat-foot-content">
        <form className="chat-form">
          <button className="chat-action chat-action-attach" type="button">
            <div className="svg svg-add" />
          </button>
          <ChatInput id={id} title={title} />
          <button className="chat-action chat-action-gift" type="button">
            <div className="tool-tip tool-tip-sm">
              <div className="tool-tip-text">
                Upgrade your friends! Gift them this awesome chat perks with Nitro
              </div>
              <div className="tool-tip-arrow tool-tip-arrow-bottom" />
            </div>
            <div className="svg svg-gift" />
          </button>
          <button className="chat-action chat-action-gif" type="button">
            <div className="svg svg-gif" />
          </button>
          <button className="chat-action chat-action-emoji" type="button">
            <div className="svg svg-emoji" />
          </button>
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
