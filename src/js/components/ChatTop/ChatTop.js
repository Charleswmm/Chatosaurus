import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import '../../../scss/components/ChatTop/ChatTop.scss';
import { withRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import IconButton, { iconButtonSubType, iconButtonToolTipPosition } from '../IconButton/IconButton';

const ChatTop = ({ history }) => {
  const { Config, DiscordStore } = useContext(GlobalContext);
  const [userData, setUserData] = useState(null);

  const { discordAPIResources: { client, user } } = Config.get(['discordAPIResources']);

  // Get user data after the components' first render
  useEffect(() => {
    // A flag to make sure state does not change when the component is not mounted
    let isMounted = true;

    DiscordStore.getData(user, client).then((res) => {
      if (isMounted) {
        setUserData(res);
      }
    }).catch((e) => {
      const error = `ChatTop - DiscordStore.getData - "${e.toString()}"`;

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
  }, [setUserData]);

  let userName = '...';

  if (userData) {
    userName = userData.username;
  }

  return (
    <div className="chat-top">
      <nav className="nav-row">
        <div className="nav-group">
          <div className="nav-item flex-grow">
            <div className="svg svg-people" />
            <div className="nav-text">{userName}</div>
          </div>
          <div className="nav-item">
            <TopIcons />
          </div>
        </div>
      </nav>
    </div>
  );
};

const TopIcons = () => {
  const { Config } = useContext(GlobalContext);
  const { chatTopButtons } = Config.get(['chatTopButtons']);
  const { plain } = iconButtonSubType;
  const { below } = iconButtonToolTipPosition;
  const searchType = 'search';

  return chatTopButtons.map(({ type }, index) => {
    if (type === searchType) {
      return <TopSearch key={index.toString()} />;
    }

    return (
      <IconButton
        key={index.toString()}
        type={type}
        subtype={plain}
        toolTipPosition={below}
      />
    );
  });
};

const TopSearch = () => (
  <div className="nav-item">
    <div className="top-search">
      <input className="search-input" type="text" name="search" placeholder="Search" />
      <div className="svg svg-search" />
    </div>
  </div>
);

ChatTop.propTypes = {
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ChatTop.defaultProps = {
  history: null,
};

export default withRouter(ChatTop);
