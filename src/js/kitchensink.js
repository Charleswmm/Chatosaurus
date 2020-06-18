import React, { Component }  from "react";
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import Chat from "./components/Chat/Chat";
import MainNav from "./components/MainNav/MainNav";
import GroupNav from "./components/GroupNav/GroupNav";
import AddServerButton from "./components/AddServerButton/AddServerButton";
import MainNavButton from "./components/MainNavButton/MainNavButton";
import Config from "./utilities/Config";
import { configuration } from "./config/kitchensink";
import { GlobalContextWrapper } from "./contexts/GlobalContextWrapper";

const kitchenSinkConfig = new Config(configuration);

class KitchenSink extends Component {
  render () {
  const { mainNavButtons, addServerButton } = kitchenSinkConfig.get(['mainNavButtons', 'addServerButton']);

    return (
      <GlobalContextWrapper Config={ kitchenSinkConfig } >
        <nav className="nav-side">
          <MainNav />
          <GroupNav />
        </nav>
        <MainNavButton { ...mainNavButtons[0] } />
        <AddServerButton { ...addServerButton } />
        <Chat />
      </GlobalContextWrapper>
    );
  };
}

ReactDOM.render(<KitchenSink />, document.getElementById("kitchensink"));