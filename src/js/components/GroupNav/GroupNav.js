import React, { Component } from "react";
import '../../../scss/components/GroupNav/GroupNav.scss';

class GroupNav extends Component {
  render() {
    return(
      <div className="nav-column nav-column-message">
        <div className="nav-group nav-group-top">
          <div className="nav-item-start">
            <button className="btn btn-start">Find or start a conversation</button>
          </div>
        </div>
        <div className="nav-group">
          <button className="nav-item nav-item-menu">Friends</button>
          <button className="nav-item nav-item-menu">Nitro</button>
        </div>
        <div className="nav-group nav-group-grow">
          <div className="nav-item-head">Direct Messages</div>
          <button className="nav-item nav-item-dm">Pytho</button>
          <button className="nav-item nav-item-dm">Jakx</button>
        </div>
        <div className="nav-group nav-group-foot">
          <div className="nav-foot"/>
        </div>
      </div>
    )
  }
}

export default GroupNav;