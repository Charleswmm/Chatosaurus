import React, { useContext } from "react";
import '../../../scss/components/MainNav/MainNav.scss';
import MainNavButton from "../MainNavButton/MainNavButton";
import AddServerButton from "../AddServerButton/AddServerButton";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";
import ServerLink from "../ServerLink/ServerLink";
import { withRouter } from "react-router";

/**
 * Let's wrap the component with withRouter() to make it receptive to route changes
 */
const MainNav = withRouter(() => (
  <div className="nav-column nav-column-server">
    <div className="nav-group">
      <MainNavButtons />
    </div>
  </div>
))

export const MainNavButtons = () => {
  const { Config } = useContext(GlobalContext)
  const { mainNavButtons } = Config.get(['mainNavButtons']);

  /**
   * A lookup table of buttons ids -> components
   * @todo Move to CMS-able source
   */
  const customButtons = [
    {
      type: 'link',
      component: ServerLink,
    },
    {
      type: 'add-server-button',
      component: AddServerButton
    }
  ];

  mainNavButtons.sort((a, b) => a.sort - b.sort);

  return mainNavButtons.map((button, index) => {
    // Check if the button id is listed in our custom buttons
    const match = customButtons.find( x => x.type === button.type);

    // Use a custom button's component or just default to ServerButton
    let component = match ? match.component : MainNavButton;

    // Render whichever component is needed
    return React.createElement(component, { key: index.toString(), ...button });
  });
};

export default MainNav;