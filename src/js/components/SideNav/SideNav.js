import React, { Component } from "react";
import '../../../scss/components/SideNav/SideNav.scss';
import ServerButton from "../ServerButton/ServerButton";

class SideNav extends Component {
  render() {
    return (
      <nav className="nav-side">
        <div className="nav-column nav-column-server">
          <div className="nav-group">
            <ServerButton active />
          </div>
          <div className="nav-group nav-group-separator"/>
          <div className="nav-group">
            <ServerButton title="Pytho's Server" initials="fs" />
            <ServerButton title="Jakx's Server" image />
            <ServerButton type="add" color="green" title="Add a Server" />
            <ServerButton type="discover" color="green" title="Server Discovery" />
          </div>
          <div className="nav-group nav-group-separator"/>
          <div className="nav-group">
            <ServerButton type="download" color="green" title="Download Apps" />
          </div>
        </div>
        <div className="nav-column nav-column-message">
          <div className="nav-group nav-group-top">
            <div className="nav-item-start">
              <button className="btn btn-start">Find or start a conversation</button>
            </div>
          </div>
          <div className="nav-group">
            <div className="nav-item nav-item-menu">Friends</div>
            <div className="nav-item nav-item-menu">Nitro</div>
          </div>
          <div className="nav-group nav-group-grow">
            <div className="nav-item-head">Direct Messages</div>
            <div className="nav-item nav-item-dm">Pytho</div>
            <div className="nav-item nav-item-dm">Jakx</div>
          </div>
          <div className="nav-group nav-group-foot">
            <div className="nav-foot"/>
          </div>
        </div>
      </nav>
    );
  }
}

export default SideNav;