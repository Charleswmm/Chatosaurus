import React, { Component } from "react";
import '../../../scss/components/MainNav/MainNav.scss';
import MainNavButton from "../MainNavButton/MainNavButton";
import AddServerButton from "../AddServerButton/AddServerButton";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";

class MainNav extends Component {
  static contextType = GlobalContext;

  render() {
    const { mainNavButtons } = this.context;
    return (
      <div className="nav-column nav-column-server">
          <div className="nav-group">
            <MainNavButtons buttons={ mainNavButtons } />
          </div>
      </div>
    )
  }
}

const MainNavButtons = (props) => {
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
    let component = match ? match.component : MainNavButton;

    // Render whichever component is needed
    return React.createElement(component, { key: index.toString(), ...button });
  });
};

export default MainNav;
