import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import '../scss/app.scss';
import ChatControl from './components/ChatControl/ChatControl';
import Friends from './components/Friends/Friends';
import GroupNav from './components/GroupNav/GroupNav';
import Login from './components/Login/Login';
import MainNav from './components/MainNav/MainNav';
import configuration from './config/app';
import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';
import Config from './utilities/Config';

const App = () => (
  <BrowserRouter>
    {/* <Route exact path={['/', '/channels']} render={() => <Redirect to="/channels/@me" />} /> */}
    <GlobalContextWrapper Config={new Config(configuration)}>
      <Route exact path="/" component={Login} />
      <Route path="/channels" component={MainNav} />
      <Route path="/channels/@me">
        <GroupNav />
        <Switch>
          <Route path="/channels/@me/:id" component={ChatControl} />
          <Route component={Friends} />
        </Switch>
      </Route>
    </GlobalContextWrapper>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
