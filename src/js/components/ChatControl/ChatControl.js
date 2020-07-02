import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import '../../../scss/components/ChatControl/ChatControl.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import ChatView from '../ChatView/ChatView';

const ChatControl = (props) => {
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
        <div className="chat-subtext">
          You find yourself in a strange place. You don&apos;t have access to any text channels,
          or there are none in this server.
        </div>
      </main>
    );
  }

  return <ChatView button={button} />;
};

ChatControl.propTypes = {
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ChatControl.defaultProps = {
  match: null,
};

export default ChatControl;
