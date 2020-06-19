import React, { Component } from "react";
import '../../../scss/components/GroupNav/GroupNav.scss';
import GroupNavDMButton from "../GroupNavDMButton/GroupNavDMButton";

class GroupNav extends Component {
  render() {
    return(
      <div className="nav-column nav-column-message">
        <div className="nav-group nav-group-top">
          <div className="nav-item nav-item-start">
            <button className="nav-item-start-content">Find or start a conversation</button>
          </div>
        </div>
        <div className="nav-group">
          <div className="nav-item nav-item-menu">
            <button className="nav-item-btn">
              <div className="nav-item-btn-text">
                Friends
              </div>
            </button>
          </div>
          <div className="nav-item nav-item-menu">
            <button className="nav-item-btn">
              <div className="nav-item-btn-text">
                Nitro
              </div>
            </button>
          </div>
        </div>
        <div className="nav-group flex-grow">
          <div className="nav-item nav-item-head">
            <div className="flex-grow">Direct Messages</div>
            <div className="svg svg-plus select-action"/>
            <div className="tool-tip">Create DM</div>
          </div>
          <GroupNavDMButton />
          <GroupNavDMButton />
        </div>
        <div className="nav-group nav-group-foot">
          <div className="nav-foot"/>
        </div>
      </div>
    )
  }
}

export default GroupNav;