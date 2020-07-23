import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import '../scss/app.scss';
import ChatControl from './components/ChatControl/ChatControl';
import Friends from './components/Friends/Friends';
import GroupNav from './components/GroupNav/GroupNav';
import LandingPage from './components/LandingPage/LandingPage';
import MainNav from './components/MainNav/MainNav';
import configuration from './config/app';
import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';
import Config from './utilities/Config';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route exact path={['/', '/channels']} render={() => <Redirect to="/channels/@me" />} />
      <GlobalContextWrapper Config={new Config(configuration)}>
        <MainNav />
        <Route path="/channels/@me">
          <GroupNav />
          <Switch>
            <Route path="/channels/@me/:id" component={ChatControl} />
            <Route component={Friends} />
          </Switch>
        </Route>
      </GlobalContextWrapper>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
