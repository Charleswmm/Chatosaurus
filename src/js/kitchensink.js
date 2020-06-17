import React, { Component }  from "react";
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import Chat from "./components/Chat/Chat";
import MainNav from "./components/MainNav/MainNav";
import GroupNav from "./components/GroupNav/GroupNav";
import { GlobalContextWrapper } from "./contexts/GlobalContextWrapper";
import Config from "./utilities/Config";
import { configuration } from "./config/app";

class KitchenSink extends Component {
  render () {
    return (
      <GlobalContextWrapper initialConfig={new Config(configuration)} >
        <nav className="nav-side">
          <MainNav />
        </nav>
      </GlobalContextWrapper>
    );
  };
}

ReactDOM.render(<KitchenSink />, document.getElementById("kitchensink"));