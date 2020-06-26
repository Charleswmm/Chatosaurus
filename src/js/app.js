import React from "react";
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import Chat from "./components/Chat/Chat";
import MainNav from "./components/MainNav/MainNav";
import GroupNav from "./components/GroupNav/GroupNav";
import { GlobalContextWrapper } from "./contexts/GlobalContextWrapper";
import { BrowserRouter } from "react-router-dom";
import Config from "./utilities/Config";
import { configuration } from "./config/app";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalContextWrapper Config={new Config(configuration)} >
        <nav className="nav-side">
          <MainNav />
          <GroupNav />
        </nav>
        <Chat />
      </GlobalContextWrapper>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));