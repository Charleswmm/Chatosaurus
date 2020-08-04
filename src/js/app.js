import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import '../scss/app.scss';
import Auth from './components/Auth/Auth';
import ChatControl from './components/ChatControl/ChatControl';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Friends from './components/Friends/Friends';
import GroupNav from './components/GroupNav/GroupNav';
import Login from './components/Login/Login';
import MainNav from './components/MainNav/MainNav';
import OAuthCallback from './components/OAuthCallback/OAuthCallback';
import configuration from './config/app';
import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';
import Config from './utilities/Config';
import DiscordStore from './utilities/DiscordStore';

const config = new Config(configuration);
const discordStore = new DiscordStore(config);

const App = () => (
  <BrowserRouter>
    <GlobalContextWrapper Config={config} DiscordStore={discordStore}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="/oauthcallback" component={OAuthCallback} />
        <Auth>
          <Route exact path={['/', '/channels']} render={() => <Redirect to="/channels/@me" />} />
          <Route path="/channels" component={MainNav} />
          <Route path="/channels/@me">
            <GroupNav />
            <Switch>
              <Route path="/channels/@me/:id" component={ChatControl} />
              <Route component={Friends} />
            </Switch>
          </Route>
        </Auth>
      </Switch>
    </GlobalContextWrapper>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
