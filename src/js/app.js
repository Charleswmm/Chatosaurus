import React, { Component }  from "react";
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import Chat from "./components/Chat/Chat";
import MainNav from "./components/MainNav/MainNav";
import GroupNav from "./components/GroupNav/GroupNav";
import { GlobalContextWrapper } from "./contexts/GlobalContextWrapper";
import Config from "./utilities/Config";
import { configuration } from "./config/app";

class App extends Component {
  render () {
    return (
      <GlobalContextWrapper Config={new Config(configuration)} >
        <nav className="nav-side">
          <MainNav />
          <GroupNav />
        </nav>
        <Chat />
      </GlobalContextWrapper>
    );
  };
}

ReactDOM.render(<App />, document.getElementById("app"));