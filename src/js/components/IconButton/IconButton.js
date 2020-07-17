import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import '../../../scss/components/IconButton/IconButton.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

export const iconButtonType = {
  addDM: 'add-dm',
  voiceCall: 'voice-call',
  videoCall: 'video-call',
  pinnedMessage: 'pin',
  addFriend: 'add-friend',
  memberList: 'members',
  inbox: 'inbox',
  help: 'help',
  addAttachment: 'add',
  addGift: 'gift',
  addGif: 'gif',
  addEmoji: 'emoji',
  micAction: 'mic',
  deafenAction: 'deafen',
  settings: 'cog',
  reaction: 'reaction',
  more: 'more',
  edit: 'edit',
};

export const iconButtonSubType = {
  plain: 'icon-button-plain',
  rounded: 'icon-button-rounded',
};

export const iconButtonToolTipPosition = {
  above: 'tool-tip-above',
  below: 'tool-tip-below',
  arrowClassTop: 'tool-tip-arrow-top',
  arrowClassBottom: 'tool-tip-arrow-bottom',
};

export const toggleStates = {
  on: 'on',
  off: 'off',
};

const IconButton = (props) => {
  const {
    type, subtype, toolTipPosition, toggleState, changeButtonState,
  } = props;
  const { Config } = useContext(GlobalContext);
  const { iconButtons } = Config.get(['iconButtons']);
  const { off } = toggleStates;

  const iconButtonProps = iconButtons.find((e) => e.type === type);

  if (!iconButtonProps) {
    // eslint-disable-next-line no-console
    console.log('Error: Button type not found in the configuration');
    return <div className="icon-button-error" />;
  }

  const { toolTipText, toolTipTextAlt } = iconButtonProps;

  const svgClass = !toggleState ? type : [type, toggleState].join('-');

  const text = toggleState === off ? toolTipTextAlt : toolTipText;

  const clickHandler = () => {
    if (changeButtonState) {
      changeButtonState(type, toggleState);
    }
  };

  return (
    <button className={`icon-button ${subtype}`} type="button" onClick={clickHandler}>
      <div className={`svg svg-${svgClass}`} />
      <ToolTip
        text={text}
        toolTipPosition={toolTipPosition}
      />
    </button>
  );
};

const ToolTip = (props) => {
  const { text, toolTipPosition } = props;

  if (!text) {
    return <div />;
  }

  const { above, arrowClassTop, arrowClassBottom } = iconButtonToolTipPosition;
  const arrowPosition = toolTipPosition === above ? arrowClassBottom : arrowClassTop;

  return (
    <div className="tip-holder">
      <div className={`tool-tip ${toolTipPosition}`}>
        <div className="tool-tip-text tool-tip-text-sm">{text}</div>
        <div className={`tool-tip-arrow ${arrowPosition}`} />
      </div>
    </div>
  );
};

IconButton.propTypes = {
  type: PropTypes.string,
  subtype: PropTypes.string,
  toggleState: PropTypes.string,
  toolTipPosition: PropTypes.string,
  changeButtonState: PropTypes.func,
};

IconButton.defaultProps = {
  type: null,
  subtype: null,
  toggleState: null,
  toolTipPosition: null,
  changeButtonState: null,
};

ToolTip.propTypes = {
  text: PropTypes.string,
  toolTipPosition: PropTypes.string,
};

ToolTip.defaultProps = {
  text: null,
  toolTipPosition: null,
};

export default IconButton;
