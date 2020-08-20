import React, { useContext, useState } from 'react';
import '../../../scss/components/UserControlPanel/UserControlPanel.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import useDiscordData from '../../hooks/useDiscordData';
import IconButton, {
  iconButtonSubType,
  iconButtonToolTipPosition,
  iconButtonType,
  toggleStates,
} from '../IconButton/IconButton';
import defaultAvatar from '../../../img/discord-placeholder.png';

const UserControlPanel = () => {
  const { Config } = useContext(GlobalContext);

  const config = Config.get(['discordAPIResources', 'discordUrls']);
  const { discordAPIResources, discordUrls: { appCDN } } = config;
  const { client, users, atMe, avatarPath } = discordAPIResources;

  const userData = useDiscordData([users, atMe], client);

  const { micAction, deafenAction, settings } = iconButtonType;
  const { rounded } = iconButtonSubType;
  const { above } = iconButtonToolTipPosition;
  const { on, off } = toggleStates;

  const [buttonState, setButtonState] = useState({
    micState: on, deafenState: off,
  });
  const { micState, deafenState } = buttonState;

  let userName = '...';
  let userDiscriminator = '...';
  let avatarUrl = defaultAvatar;

  // If there is userData, replace the "skeleton" ("...") with userData
  if (userData) {
    const { username, discriminator, avatar, id } = userData;
    userName = username;
    userDiscriminator = discriminator;

    if (avatar) {
      // Build the avatar URL from the `userData`
      avatarUrl = [appCDN, avatarPath, id, avatar].join('/');
    }
  }

  /**
   * Toggles the mic or deafen buttons
   * @param action
   * @param currentState
   */
  const changeButtonState = (action, currentState) => {
    const toggleState = currentState === on ? off : on;

    const actionType = action === micAction
      ? {
        micState: toggleState,
      }
      : {
        deafenState: toggleState,
      };

    setButtonState({
      ...buttonState,
      ...actionType,
    });
  };

  return (
    <div className="user-control-panel">
      <div
        className="user-control-avatar"
        style={{
          backgroundImage: `url(${avatarUrl})`,
        }}
      />
      <div className="user-control-title">
        <div className="user-control-text">{userName}</div>
        <div className="user-control-subtext">{`#${userDiscriminator}`}</div>
        <div className="tool-tip">
          <div className="tool-tip-text tool-tip-text-sm">Click to copy username</div>
          <div className="tool-tip-arrow tool-tip-arrow-bottom" />
        </div>
      </div>
      <div className="user-control-actions">
        <IconButton
          type={micAction}
          subtype={rounded}
          toolTipPosition={above}
          toggleState={micState}
          changeButtonState={changeButtonState}
        />
        <IconButton
          type={deafenAction}
          subtype={rounded}
          toolTipPosition={above}
          toggleState={deafenState}
          changeButtonState={changeButtonState}
        />
        <IconButton
          type={settings}
          subtype={rounded}
          toolTipPosition={above}
        />
      </div>
    </div>
  );
};

export default UserControlPanel;
