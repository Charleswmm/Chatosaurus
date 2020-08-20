import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import '../scss/app.scss';
import Auth from './components/Auth/Auth';
import ChannelNav from './components/ChannelNav/ChannelNav';
import ChatControl from './components/ChatControl/ChatControl';
import Director from './components/Director/Director';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Friends from './components/Friends/Friends';
import GroupNav from './components/GroupNav/GroupNav';
import Loading from './components/Loading/Loading';
import Login from './components/Login/Login';
import MainNav from './components/MainNav/MainNav';
import OAuthCallback from './components/OAuthCallback/OAuthCallback';
import OAuthRefresh from './components/OAuthRefresh/OAuthRefresh';
import configuration from './config/app';
import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';
import Config from './utilities/Config';
import DiscordStore from './utilities/DiscordStore';

const config = new Config(configuration);
const discordStore = new DiscordStore(config);

const App = () => (
  <BrowserRouter>
    <GlobalContextWrapper Config={config} DiscordStore={discordStore}>
      <Route component={Loading} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="/oauthcallback" component={OAuthCallback} />
        <Route exact path="/oauthrefresh" component={OAuthRefresh} />
        <Auth>
          <Director>
            <Route path="/channels" component={MainNav} />
            <Route path="/channels/@me" component={GroupNav} />
            <Route exact path="/channels/@me" component={Friends} />
            <Route exact path="/channels/:guild([0-9]+)" component={ChannelNav} />
            <Route exact path="/channels/:guild([0-9]+)/:id([0-9]+)" component={ChatControl} />
          </Director>
        </Auth>
      </Switch>
    </GlobalContextWrapper>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
