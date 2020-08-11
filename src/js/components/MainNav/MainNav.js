import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import '../../../scss/components/MainNav/MainNav.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import AddServerButton from '../AddServerButton/AddServerButton';
import MainNavButton from '../MainNavButton/MainNavButton';
import ServerLink from '../ServerLink/ServerLink';

const MainNav = ({ history }) => {
  const { Config, DiscordStore } = useContext(GlobalContext);
  const [guildData, setGuildData] = useState(null);

  const config = Config.get([
    'discordAPIResources',
    'mainNavButtons',
    'mainNavButtonTypes',
    'discordUrls',
  ]);

  const { discordAPIResources, mainNavButtons, mainNavButtonTypes, discordUrls } = config;
  const { link, addServerButton } = mainNavButtonTypes;
  const { client, guilds, icons } = discordAPIResources;
  const { appCDN } = discordUrls;

  let addGuildData;

  if (guildData) {
    // Add sort, button type, and the icon url to each guild
    addGuildData = guildData.map((data, index) => {
      const { id, icon } = data;

      const iconUrl = icon ? [appCDN, icons, id, icon].join('/') : null;

      return {
        ...data,
        icon: iconUrl,
        sort: index + 1,
        type: link,
      };
    });

    // Find the home and utility buttons from `mainNavButtons`
    const homeButton = mainNavButtons.filter((e) => !e.sort);
    let utilityButtons = mainNavButtons.filter((e) => !e.type || e.type === addServerButton);

    const utilityButtonPosition = addGuildData.length;

    // Changing the position of the utility buttons depending on the number of guilds
    utilityButtons = utilityButtons.map((e) => ({
      ...e,
      sort: e.sort + utilityButtonPosition,
    }));

    // Set the new buttons in "Config"
    if (homeButton && addGuildData && utilityButtons) {
      Config.set({
        mainNavButtons: [
          ...homeButton,
          ...addGuildData,
          ...utilityButtons,
        ],
      });
    }
  }

  // Get user guild data after the components' first render
  useEffect(() => {
    // A flag to make sure state does not change when the component is not mounted
    let isMounted = true;

    DiscordStore.getData(guilds, client).then((res) => {
      if (isMounted) {
        res.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        setGuildData(res);
      }
    }).catch((e) => {
      const error = `MainNav - DiscordStore.getData - "${e.toString()}"`;

      history.push({
        pathname: '/error',
        state: {
          error,
        },
      });
    });

    // The return function is called when the component has unmounted
    return () => {
      isMounted = false;
    };
  }, [setGuildData]);

  return (
    <div className="nav-column nav-column-server">
      <div className="nav-group">
        <MainNavButtons />
      </div>
    </div>
  );
};

const MainNavButtons = () => {
  const { Config } = useContext(GlobalContext);
  const { mainNavButtons } = Config.get(['mainNavButtons']);

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
      key: index.toString(),
      ...button,
    });
  });
};

MainNav.propTypes = {
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

MainNav.defaultProps = {
  history: null,
};

export default MainNav;
