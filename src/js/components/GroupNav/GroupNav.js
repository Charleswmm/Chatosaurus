import React, { Component } from "react";
import '../../../scss/components/GroupNav/GroupNav.scss';
import GroupNavDMButtons from "../GroupNavDMButtons/GroupNavDMButtons";

class GroupNav extends Component {
  render() {
    return(
      <div className="nav-column nav-column-message">
        <div className="nav-group nav-group-top">
          <div className="nav-item nav-item-start">
            <button className="btn btn-nav-item-start">Find or start a conversation</button>
          </div>
        </div>
        <div className="nav-group nav-group-dm flex-grow">
          <div className="nav-subgroup nav-subgroup-menu">
            <div className="nav-item nav-item-menu">
              <button className="btn btn-nav-item">
                <div className="btn-nav-item-text">Friends</div>
              </button>
            </div>
            <div className="nav-item nav-item-menu">
              <button className="btn btn-nav-item">
                <div className="btn-nav-item-text">Nitro</div>
              </button>
            </div>
          </div>
          <GroupNavDMButtons />
        </div>
        <div className="nav-group nav-group-foot">
          <div className="nav-foot"/>
        </div>
      </div>
    )
  }
}

export default GroupNav;