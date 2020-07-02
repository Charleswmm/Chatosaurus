import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import '../../../scss/components/Chat/Chat.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import ChatTopBar from '../ChatTopBar/ChatTopBar';

const Chat = (props) => {
  const context = useContext(GlobalContext);
  const { match } = props;
  const { Config } = context;
  const { groupNavDMButtons } = Config.get(['groupNavDMButtons']);
  const button = groupNavDMButtons.filter((e) => e.id === match.params.id).shift();

  if (!button) {
    return (
      <main className="no-chat">
        <div className="svg svg-no-chat" />
        <div className="chat-text">No Text Channels</div>
        <div className="chat-subtext">You find yourself in a strange place. You don&apos;t have access to any text channels, or there are none in this server.</div>
      </main>
    );
  }

  const { id, title } = button;

  return (
    <main className="chat">
      <ChatTopBar id={id} title={title} />
      <div className="chat-body" />
      <div className="chat-foot" />
    </main>
  );
};

Chat.propTypes = {
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Chat.defaultProps = {
  match: null,
};

export default Chat;
