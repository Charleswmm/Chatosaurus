import React, { Component } from "react";
import '../../../scss/components/GroupNavDMButtons/GroupNavDMButtons.scss';
import GroupNavDMButton, { backgroundColorClassNames } from "../GroupNavDMButton/GroupNavDMButton";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";

class GroupNavDMButtons extends Component {
  static contextType = GlobalContext;

  /**
   * Placeholder function to create new random buttons
   * @returns {{backgroundColor: *, avatarSrc: string, id: string, title: string}}
   */
  randomNewGroupNavDMButton = () => {
    let randomId = Math.floor(Math.random() * 10000 );
    const addAvatarSrc = randomId > 8000 ? 'url' : '';
    const randomBackgroundColor = Object.values(backgroundColorClassNames)[Math.floor(randomId/2000+1)]
    const randomMembers = Math.floor(randomId/2500)
    randomId = randomId.toString(16);

    return {
      id: randomId,
      title: `Server ${randomId.toUpperCase()}`,
      avatarSrc: `${addAvatarSrc}`,
      members: randomMembers,
      backgroundColor: `${randomBackgroundColor}`,
    };
  }

  addButtonClickHandler = () => {
    const button = this.randomNewGroupNavDMButton();
    this.context.Config.set({ groupNavDMButtons: [ button, ...this.getGroupNavDMButtons() ] });
    this.context.setCurrentGroupNavDMButtonId(button.id);
  }

  removeButtonClickHandler = (id) => {
    const newGroupNavDMButtons = this.getGroupNavDMButtons().filter(button => button.id !== id)
    this.context.Config.set({ groupNavDMButtons: newGroupNavDMButtons });
    const activeButton = this.context.state.currentGroupNavDMButtonId === id ? id : this.context.state.currentGroupNavDMButtonId;
    this.context.setCurrentGroupNavDMButtonId(activeButton);
  }

  createGroupNavDMButtons = () => this.getGroupNavDMButtons().map((button, index) =>
    <GroupNavDMButton key={index.toString()} removeButtonFunc={ this.removeButtonClickHandler } {...button} />
  );

  getGroupNavDMButtons = () => this.context.Config.get(['groupNavDMButtons']).groupNavDMButtons;

  render () {
    return (
      <div className="nav-subgroup nav-subgroup-dm">
        <div className="nav-item nav-item-head">
          <div className="flex-grow">Direct Messages</div>
          <div className="svg svg-plus add-group-dm" onClick={ this.addButtonClickHandler }/>
          <div className="tool-tip">Create DM</div>
        </div>
        { this.createGroupNavDMButtons() }
      </div>
    )
  }
}

export default GroupNavDMButtons