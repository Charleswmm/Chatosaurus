import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import ChatView from '../ChatView/ChatView';
import NoChat from '../NoChat/NoChat';

const ChatControl = (props) => {
  const context = useContext(GlobalContext);
  const { match } = props;
  const { Config } = context;
  const { groupNavDMButtons } = Config.get(['groupNavDMButtons']);
  const button = groupNavDMButtons.filter((e) => e.id === match.params.id).shift();

  if (!button) {
    return <NoChat />;
  }

  const { id, title } = button;

  return <ChatView id={id} title={title} />;
};

ChatControl.propTypes = {
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ChatControl.defaultProps = {
  match: null,
};

export default ChatControl;