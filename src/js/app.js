import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import '../scss/app.scss';
import Auth from './components/Auth/Auth';
import ChatControl from './components/ChatControl/ChatControl';
import Friends from './components/Friends/Friends';
import GroupNav from './components/GroupNav/GroupNav';
import Loading from './components/Loading/Loading';
import Login from './components/Login/Login';
import MainNav from './components/MainNav/MainNav';
import Oauth from './components/Oauth/Oauth';
import configuration from './config/app';
import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';
import Config from './utilities/Config';
import Fetcher from './utilities/Fetcher';

const config = new Config(configuration);
const fetcher = new Fetcher(config);

const App = () => (
  <BrowserRouter>
    <GlobalContextWrapper Config={config} Fetcher={fetcher}>
      <Switch>
        <Route exact path="/loading" component={Loading} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/oauth" component={Oauth} />
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
