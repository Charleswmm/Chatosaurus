import React from "react";
import MainNavItem from "../MainNavItem/MainNavItem";

class MainNavButton extends MainNavItem {

  /**
   * Overwrite this method to control subclass click behaviour
   */
  onClickHandler = () => {};

  render = () => (
    <div className="nav-item nav-item-server">
      <button className={ this.channelClassNames() } style={ this.backgroundImageStyle() } onClick={ this.onClickHandler }>
        <div className={ this.contentClassNames() }>{ this.titleInitials() }</div>
      </button>
      <div className="pip"/>
      <div className="tool-tip">{ this.title() }</div>
    </div>
  );
}

export default MainNavButton;