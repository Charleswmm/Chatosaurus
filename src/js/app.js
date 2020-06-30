import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import '../scss/app.scss';
import Chat from './components/Chat/Chat';
import GroupNav from './components/GroupNav/GroupNav';
import MainNav from './components/MainNav/MainNav';
import configuration from './config/app';
import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';
import Config from './utilities/Config';

const App = () => (
  <BrowserRouter>
    <GlobalContextWrapper Config={new Config(configuration)}>
      <Route exact path={['/', '/channels']} render={() => <Redirect to="/channels/@me" />} />
      <MainNav />
      <Route path="/channels/@me">
        <GroupNav />
        <Chat />
      </Route>
    </GlobalContextWrapper>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
