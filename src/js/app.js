import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import '../scss/app.scss';
import ChatControl from './components/ChatControl/ChatControl';
import GroupNav from './components/GroupNav/GroupNav';
import MainNav from './components/MainNav/MainNav';
import configuration from './config/app';
import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';
import Config from './utilities/Config';

const App = () => (
  <BrowserRouter>
    <Route exact path={['/', '/channels']} render={() => <Redirect to="/channels/@me" />} />
    <GlobalContextWrapper Config={new Config(configuration)}>
      <MainNav />
      <Route path="/channels/@me">
        <GroupNav />
        <Route path="/channels/@me/:id" component={ChatControl} />
        {/* @todo Friends view goes here */}
      </Route>
    </GlobalContextWrapper>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
