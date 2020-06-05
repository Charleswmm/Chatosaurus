import React, { Component } from "react";
import '../../../scss/components/SideNav/SideNav.scss';
import ServerButton, { staticButtons, uiClassNames } from "../ServerButton/ServerButton";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'Home',
    }
  }

  /**
   * This function is called by the button child component and sets the state of 'active' to the title of the component
   * @param title
   */
  getServerButtonClick = (title) => {
    this.setState({ active: title })
  }

  /**
   * To add a new channel, push an object to the customChannels[] array. A title is required, an image is not
   *  This might need to be in state?
   */
  customChannels = [{ title: "Pytho's Server", imageSrc: 'url', }, { title: "Jakx's Server", imageSrc: null, },]

  /**
   * Builds each button with its' props
   */
  serverButtons = []

  buildServerButtons = () => {
    this.addBlueToCustomChannels()
    this.serverButtons = this.orderServerButton()
    this.setActive()
    return this.serverButtons.map((channel, index) => {
        return  <ServerButton
            key={index.toString()}
            title={channel.title}
            imageSrc={channel.imageSrc}
            iconClassName={channel.iconClassName}
            channelExtraClassNames={channel.channelExtraClassNames}
            getServerButtonClick={this.getServerButtonClick}
            isActive={channel.active}
          />
        }
      )
  };

  /**
   * adds the blue color property to each custom server
   * @returns {*[][]}
   */
  addBlueToCustomChannels = () => this.customChannels.map(obj => obj.channelExtraClassNames = [uiClassNames.blue])

  /**
   * Orders the buttons to be correctly displayed on the screen
   */
  orderServerButton = () => [
    ...staticButtons.slice(0,1),
    ...this.customChannels,
    ...staticButtons.slice(-3),
  ];

  /**
   * Sets the property 'active' to true if the state matches the title of a button
   * @returns {boolean[]}
   */
  setActive = () => this.serverButtons.map(obj => (obj.title === this.state.active)? obj.active = true : obj.active = false)

  render() {
    return (
      <nav className="nav-side">
        <div className="nav-column nav-column-server">
          { this.buildServerButtons() }
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