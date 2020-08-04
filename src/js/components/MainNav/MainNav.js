import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import '../../../scss/components/MainNav/MainNav.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import AddServerButton from '../AddServerButton/AddServerButton';
import MainNavButton from '../MainNavButton/MainNavButton';
import ServerLink from '../ServerLink/ServerLink';

/**
 * Let's wrap the component with withRouter() to make it receptive to route changes
 */
const MainNav = withRouter(() => (
  <div className="nav-column nav-column-server">
    <div className="nav-group">
      <MainNavButtons />
    </div>
  </div>
));

export const MainNavButtons = () => {
  const { Config } = useContext(GlobalContext);
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
      component: AddServerButton,
    },
  ];

  mainNavButtons.sort((a, b) => a.sort - b.sort);

  return mainNavButtons.map((button, index) => {
    // Check if the button id is listed in our custom buttons
    const match = customButtons.find((x) => x.type === button.type);

    // Use a custom button's component or just default to ServerButton
    const component = match ? match.component : MainNavButton;

    // Render whichever component is needed
    // Prop spreading is used to save on overheads due to components having different props
    return React.createElement(component, {
      key: index.toString(), ...button,
    });
  });
};

export default MainNav;
