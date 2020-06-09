import React, { Component } from "react";
import '../../../scss/components/ServerNav/ServerNav.scss';
import ServerButton from "../ServerButton/ServerButton";
import { GlobalContext } from "../../contexts/GlobalContext";
import AddServerButton from "../AddServerButton/AddServerButton";

class ServerNav extends Component {
  static contextType = GlobalContext;

  render() {
    const { serverNavButtons } = this.context;

    return (
      <div className="nav-column nav-column-server">
          <div className="nav-group">
            <ServerButtons buttons={ serverNavButtons } />
          </div>
      </div>
    )
  }
}

const ServerButtons = (props) => {
  const { buttons } = props;

  /**
   * A lookup table of buttons ids -> components
   *
   * @todo Move to CMS-able source
   */
  const customButtons = [
    {
      id: 'add-a-server',
      component: AddServerButton
    }
  ];

  return buttons.map((button, index) => {
    // Check if the button id is listed in our custom buttons
    const match = customButtons.find( x => x.id === button.id);
    // Use a custom button's component or just default to ServerButton
    let component = match ? match.component : ServerButton;
    // Render whichever component is needed
    return React.createElement(component, { key: index.toString(), ...button });
  });
};

export default ServerNav;
