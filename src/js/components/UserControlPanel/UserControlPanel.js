import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import '../../../scss/components/UserControlPanel/UserControlPanel.scss';

const micClassNames = {
  micOn: 'svg-mic-on',
  micOff: 'svg-mic-off',
};

const deafenClassNames = {
  deafenOn: 'svg-deafen-on',
  deafenOff: 'svg-deafen-off',
};

const micToolTipText = {
  micToolTipOn: 'Mute',
  micToolTipOff: 'Unmute',
};

const deafenToolTipText = {
  deafenToolTipOn: 'Undeafen',
  deafenToolTipOff: 'Deafen',
};

const UserControlPanel = () => {
  const { Config } = useContext(GlobalContext);
  const { currentUser } = Config.get(['currentUser']);
  const { userName, userNameSuffix, avatar } = currentUser;
  const { micOn } = micClassNames;
  const { deafenOff } = deafenClassNames;
  const { micToolTipOn, micToolTipOff } = micToolTipText;
  const { deafenToolTipOn, deafenToolTipOff } = deafenToolTipText;

  const [state, setState] = useState({ micClassName: micOn, deafenClassName: deafenOff });
  const { micClassName, deafenClassName } = state;

  let micToolTip = micToolTipOn;
  let deafenToolTip = deafenToolTipOff;

  if (micClassName !== micOn) {
    micToolTip = micToolTipOff;
  }

  if (deafenClassName !== deafenOff) {
    deafenToolTip = deafenToolTipOn;
  }

  /**
   * Toggles the svg class of either mic or deafen buttons depending on which was clicked
   * @param evt
   */
  const toggle = (evt) => {
    const targetClass = evt.target.classList.contains('svg')
      ? [...evt.target.classList].pop()
      : [...evt.target.firstChild.classList].pop();

    const micClassNameValues = Object.values(micClassNames);

    if (micClassNameValues.find((e) => e === targetClass)) {
      const micClassNameIndex = micClassNameValues.findIndex((e) => e === targetClass);
      micClassNameValues.splice(micClassNameIndex, 1);

      setState({ ...state, micClassName: micClassNameValues[0] });
      return;
    }

    const deafenClassNameValues = Object.values(deafenClassNames);

    const deafenClassNameIndex = deafenClassNameValues.findIndex((e) => e === targetClass);
    deafenClassNameValues.splice(deafenClassNameIndex, 1);

    setState({ ...state, deafenClassName: deafenClassNameValues[0] });
  };

  return (
    <div className="user-control-panel">
      <div className="user-control-avatar" style={{ backgroundImage: `url(${avatar})` }} />
      <div className="user-control-title">
        <div className="user-control-text">{userName}</div>
        <div className="user-control-subtext">{`#${userNameSuffix}`}</div>
        <div className="tool-tip tool-tip-sm">
          <div className="tool-tip-text">Click to copy username</div>
          <div className="tool-tip-arrow tool-tip-arrow-bottom" />
        </div>
      </div>
      <div className="user-control-actions">
        <button type="button" className="user-control-action" onClick={toggle}>
          <div className={`svg ${micClassName}`} />
          <div className="tool-tip tool-tip-sm">
            <div className="tool-tip-text">{micToolTip}</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </button>
        <button type="button" className="user-control-action" onClick={toggle}>
          <div className={`svg ${deafenClassName}`} />
          <div className="tool-tip tool-tip-sm">
            <div className="tool-tip-text">{deafenToolTip}</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </button>
        <button type="button" className="user-control-action">
          <div className="svg svg-cog" />
          <div className="tool-tip tool-tip-sm">
            <div className="tool-tip-text">User Settings</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserControlPanel;
