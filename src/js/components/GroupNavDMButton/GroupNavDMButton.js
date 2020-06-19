import React, { Component } from "react";
import '../../../scss/components/GroupNavDMButton/GroupNavDMButton.scss';

class GroupNavDMButton extends Component {
  render() {
    return (
      <div className="nav-item nav-item-dm">
        <button className="nav-item-btn">
          <div className="avatar avatar-default" />
          <div className="nav-item-btn-text flex-grow">
            <div className="flex-grow" >Pytho</div>
            <div className="nav-item-dm-subtext">1 Member</div>
          </div>
          <div className="svg svg-cross" />
        </button>
      </div>
    )
  }
}

export default GroupNavDMButton;
