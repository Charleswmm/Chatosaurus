import React from "react";
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import Chat from "./components/Chat/Chat";
import MainNav from "./components/MainNav/MainNav";
import GroupNav from "./components/GroupNav/GroupNav";
import { GlobalContextWrapper } from "./contexts/GlobalContextWrapper";
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect } from "react-router";
import Config from "./utilities/Config";
import { configuration } from "./config/app";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalContextWrapper Config={new Config(configuration)} >
        <Route exact path={['/', '/channels']} render={() => <Redirect to='/channels/@me' /> } />
        <MainNav />
        <Route path="/channels/@me">
          <GroupNav />
          <Chat />
        </Route>
      </GlobalContextWrapper>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));