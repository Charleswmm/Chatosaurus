import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';
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
  const { state, setChatInputState } = useContext(GlobalContext);
  const refInput = useRef(null);

  const maxInputHeight = 132;
  let chatInput = '';
  let currentInputHeight = 22;

  if (state[id]) {
    chatInput = state[id].chatInput;
  }

  if (state[id]) {
    currentInputHeight = state[id].currentInputHeight;
  }

  /**
   * Set the state with each key stroke
   * @param evt
   */
  const setChatInput = (evt) => {
    setChatInputState(id, evt.target.value, currentInputHeight);
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

    setChatInputState(id, chatInput, scrollHeight);
  });

  return (
    <textarea
      name="chatInput"
      className="chat-textarea flex-grow"
      style={{ height: `${currentInputHeight}px` }}
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
