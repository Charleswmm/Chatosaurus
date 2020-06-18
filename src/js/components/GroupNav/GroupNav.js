import React, { Component } from "react";
import '../../../scss/components/GroupNav/GroupNav.scss';

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
            <button className="nav-item-btn">Friends</button>
          </div>
          <div className="nav-item nav-item-menu">
            <button className="nav-item-btn">Nitro</button>
          </div>
        </div>
        <div className="nav-group flex-grow">
          <div className="nav-item nav-item-head">
            <div className="flex-grow">Direct Messages</div>
            <div className="svg svg-plus"/>
          </div>
          <div className="nav-item nav-item-dm">
            <button className="nav-item-btn">
              <div className="avatar avatar-default" />
              <div className="nav-item-dm-text flex-grow">
                <div className="flex-grow" >Pytho</div>
                <div className="nav-item-dm-subtext">1 Member</div>
              </div>
              <div className="svg svg-cross" />
            </button>
          </div>
          <div className="nav-item nav-item-dm">
            <button className="nav-item-btn">
              <div className="avatar avatar-default" />
              <div className="nav-item-dm-text flex-grow">
                <div className="flex-grow" >Jakx</div>
                <div className="nav-item-dm-subtext">2 Member</div>
              </div>
              <div className="svg svg-cross" />
            </button>
          </div>
        </div>
        <div className="nav-group nav-group-foot">
          <div className="nav-foot"/>
        </div>
      </div>
    )
  }
}

export default GroupNav;