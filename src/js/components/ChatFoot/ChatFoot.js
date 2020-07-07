import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import '../../../scss/components/ChatFoot/ChatFoot.scss';

const ChatFoot = (props) => {
  const { title } = props;

  return (
    <div className="chat-foot">
      <div className="chat-foot-content">
        <form className="chat-form">
          <button className="chat-action chat-action-attach" type="button">
            <div className="svg svg-add" />
          </button>
          <ChatInput title={title} />
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
  const { title } = props;
  const maxInputHeight = 132;
  const refInput = useRef(null);
  const [inputState, setInputState] = useState({
    chatInput: '',
    currentInputHeight: 22,
  });
  const { chatInput, currentInputHeight } = inputState;

  /**
   * Set the state with each key stroke
   * @param evt
   */
  const setChatInputState = (evt) => {
    setInputState({
      ...inputState,
      [evt.target.name]: evt.target.value,
    });
  };

  /**
   * The state will be set with the new height when there is a scrollable overflow
   * useEffect is called at the same time as "componentDidMount"
   * `refInput.current` will contain the DOM properties of the referenced element
   * `scrollHeight` is the actual height of the scrollable element
   */
  useEffect(() => {
    const { scrollHeight } = refInput.current;

    if (currentInputHeight >= maxInputHeight) {
      return;
    }

    if (scrollHeight <= currentInputHeight) {
      return;
    }

    setInputState({
      ...inputState,
      currentInputHeight: scrollHeight,
    });
  });

  return (
    <textarea
      name="chatInput"
      className="chat-textarea flex-grow"
      style={{ height: `${currentInputHeight}px` }}
      placeholder={`Message @${title}`}
      value={chatInput}
      onChange={setChatInputState}
      ref={refInput}
    />
  );
};

ChatFoot.propTypes = {
  title: PropTypes.string,
};

ChatFoot.defaultProps = {
  title: null,
};

ChatInput.propTypes = {
  title: PropTypes.string,
};

ChatInput.defaultProps = {
  title: null,
};

export default ChatFoot;
