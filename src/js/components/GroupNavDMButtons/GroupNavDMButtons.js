import React, { Component } from 'react';
import '../../../scss/components/GroupNavDMButtons/GroupNavDMButtons.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import GroupNavDMButton, { backgroundColorClassNames } from '../GroupNavDMButton/GroupNavDMButton';

class GroupNavDMButtons extends Component {
  static contextType = GlobalContext;

  /**
   * Placeholder function to create new random buttons
   * @returns {{backgroundColor: *, avatarSrc: string, id: string, title: string}}
   */
  randomNewGroupNavDMButton = () => {
    let randomId = Math.floor(Math.random() * 10000);
    const addAvatarSrc = randomId > 8000 ? 'url' : '';
    const backgroundColors = Object.values(backgroundColorClassNames);
    const randomBackgroundColor = backgroundColors[Math.floor(randomId / 2000 + 1)];
    const randomMembers = Math.floor(randomId / 2500);
    randomId = randomId.toString(16);

    return {
      id: randomId,
      title: `Server ${randomId.toUpperCase()}`,
      avatarSrc: `${addAvatarSrc}`,
      members: randomMembers,
      backgroundColor: `${randomBackgroundColor}`,
    };
  }

  /**
   * Adds a new random group nav DM button to the configuration
   */
  addButtonClickHandler = () => {
    const { Config, setCurrentGroupNavDMButtonId } = this.context;

    const button = this.randomNewGroupNavDMButton();
    Config.set({ groupNavDMButtons: [button, ...this.getGroupNavDMButtons()] });
    setCurrentGroupNavDMButtonId(button.id);
  }

  /**
   * Called by the children to remove them selves from the configuration
   * @param id
   */
  removeButtonClickHandler = (id) => {
    const { Config, state, setCurrentGroupNavDMButtonId } = this.context;

    const newGroupNavDMButtons = this.getGroupNavDMButtons().filter((button) => button.id !== id);
    Config.set({ groupNavDMButtons: newGroupNavDMButtons });
    const activeButton = state.currentGroupNavDMButtonId === id
      ? id
      : state.currentGroupNavDMButtonId;
    setCurrentGroupNavDMButtonId(activeButton);
  }

  getGroupNavDMButtons = () => {
    const { Config } = this.context;

    return Config.get(['groupNavDMButtons']).groupNavDMButtons;
  }

  render() {
    return (
      <div className="nav-subgroup nav-subgroup-dm">
        <div className="nav-item nav-item-head">
          <div className="flex-grow">Direct Messages</div>
          <div className="svg svg-plus add-group-dm" onClick={this.addButtonClickHandler} />
          <div className="tool-tip">Create DM</div>
        </div>
        <CreateGroupNavDMButtons
          buttons={this.getGroupNavDMButtons()}
          removeButtonFunc={this.removeButtonClickHandler}
        />
      </div>
    );
  }
}

const CreateGroupNavDMButtons = (props) => {
  const { buttons, removeButtonFunc } = props;

  return buttons.map((button, index) => (
    <GroupNavDMButton
      key={index.toString()}
      removeButtonFunc={removeButtonFunc}
      {...button}
    />
  ));
};

export default GroupNavDMButtons;
