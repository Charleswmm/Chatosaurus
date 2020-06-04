import React, { Component } from "react";
import '../../../scss/components/SideNav/SideNav.scss';
import ServerButton, { iconClassNames, uiClassNames } from "../ServerButton/ServerButton";

class SideNav extends Component {
  render() {
    return (
      <nav className="nav-side">
        <div className="nav-column nav-column-server">
          <div className="nav-group">
            <ServerButton title="Home" iconClassName={iconClassNames.home} channelExtraClassNames={[uiClassNames.blue]} />
          </div>
          <div className="nav-group nav-group-separator"/>
          <div className="nav-group">
            <ServerButton title="Pytho's Server" channelExtraClassNames={[uiClassNames.blue]} />
            <ServerButton title="Jakx's Server" imageSrc="url" channelExtraClassNames={[uiClassNames.blue]} />
            <ServerButton title="Add a Server" iconClassName={iconClassNames.add} channelExtraClassNames={[uiClassNames.green]} />
            <ServerButton title="Server Discovery" iconClassName={iconClassNames.discover} channelExtraClassNames={[uiClassNames.green]} />
          </div>
          <div className="nav-group nav-group-separator"/>
          <div className="nav-group">
            <ServerButton title="Download Apps" iconClassName={iconClassNames.download} channelExtraClassNames={[uiClassNames.green]} />
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