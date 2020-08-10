import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import '../../../scss/components/UserControlPanel/UserControlPanel.scss';
import { withRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import IconButton, {
  iconButtonSubType,
  iconButtonToolTipPosition,
  iconButtonType,
  toggleStates,
} from '../IconButton/IconButton';
import defaultAvatar from '../../../img/discord-placeholder.png';

const UserControlPanel = ({ history }) => {
  const { Config, DiscordStore } = useContext(GlobalContext);
  const [userData, setUserData] = useState(null);

  const config = Config.get(['discordAPIResources', 'discordUrls']);
  const { discordAPIResources, discordUrls: { appCDN } } = config;
  const { client, user, avatarPath } = discordAPIResources;

  const { micAction, deafenAction, settings } = iconButtonType;
  const { rounded } = iconButtonSubType;
  const { above } = iconButtonToolTipPosition;
  const { on, off } = toggleStates;

  const [buttonState, setButtonState] = useState({
    micState: on, deafenState: off,
  });
  const { micState, deafenState } = buttonState;

  useEffect(() => {
    let isMounted = true;

    DiscordStore.getData(user, client).then((res) => {
      if (isMounted) {
        setUserData(res);
      }
    }).catch((e) => {
      const error = `UserControlPanel - DiscordStore.getData - ${e.toString()}`;

      history.push({
        pathname: '/error',
        state: {
          error,
        },
      });
    });

    return () => {
      isMounted = false;
    };
  }, [setUserData]);

  let userName = '...';
  let userDiscriminator = '...';
  let avatarUrl = defaultAvatar;

  if (userData) {
    const { username, discriminator, avatar, id } = userData;
    userName = username;
    userDiscriminator = discriminator;

    if (avatar) {
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

UserControlPanel.propTypes = {
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

UserControlPanel.defaultProps = {
  history: null,
};

export default withRouter(UserControlPanel);
