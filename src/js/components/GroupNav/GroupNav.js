import React, { Component } from "react";
import '../../../scss/components/GroupNav/GroupNav.scss';
import GroupNavDMButtons from "../GroupNavDMButtons/GroupNavDMButtons";

class GroupNav extends Component {
  render() {
    return(
      <div className="nav-column nav-column-message">
        <div className="nav-group nav-group-top">
          <div className="nav-item nav-item-top">
            <button className="nav-btn-top">Find or start a conversation</button>
          </div>
        </div>
        <div className="nav-group nav-group-dm">
          <div className="nav-subgroup nav-subgroup-menu">
            <div className="nav-item nav-item-menu">
              <button className="nav-btn">
                <div className="btn-content">
                  <div className="svg svg-friend"/>
                  <div className="btn-text">Friends</div>
                </div>
              </button>
            </div>
            <div className="nav-item nav-item-menu">
              <button className="nav-btn">
                <div className="btn-content">
                  <div className="svg svg-nitro"/>
                  <div className="btn-text">Nitro</div>
                </div>
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