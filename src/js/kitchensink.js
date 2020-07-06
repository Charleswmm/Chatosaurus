import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import '../scss/kitchensink.scss';
import { BrowserRouter } from 'react-router-dom';
import AddServerButton from './components/AddServerButton/AddServerButton';
import ChatControl from './components/ChatControl/ChatControl';
import ChatView from './components/ChatView/ChatView';
import GroupNav from './components/GroupNav/GroupNav';
import GroupNavDMButton from './components/GroupNavDMButton/GroupNavDMButton';
import GroupNavDMButtons from './components/GroupNavDMButtons/GroupNavDMButtons';
import MainNav from './components/MainNav/MainNav';
import MainNavButton from './components/MainNavButton/MainNavButton';
import configuration from './config/kitchensink';
import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';
import Config from './utilities/Config';

function KitchenSink() {
  return (
    <BrowserRouter>
      <GlobalContextWrapper Config={new Config(configuration)}>
        <div className="dishes">
          <GroupNavDMButton />
        </div>
        <div className="dishes">
          <MainNavButton
            id="test"
            title="Test Button"
            iconClassName=""
            imageSrc=""
            channelExtraClassNames={['nav-channel-blue']}
            contentExtraClassNames={['']}
            sort=""
          />
        </div>
        <div className="dishes">
          <AddServerButton
            id="add-a-server"
            title="Add a Server"
            iconClassName="svg svg-plus"
            imageSrc=""
            channelExtraClassNames={['nav-channel-green']}
            contentExtraClassNames={['']}
            sort=""
          />
        </div>
        <div className="dishes">
          <MainNav />
        </div>
        <div className="dishes">
          <GroupNavDMButtons />
        </div>
        <div className="dishes">
          <GroupNav />
        </div>
        <div className="dishes">
          <ChatView />
        </div>
        <div className="dishes">
          <ChatControl />
        </div>
      </GlobalContextWrapper>
    </BrowserRouter>
  );
}

ReactDOM.render(<KitchenSink />, document.getElementById('kitchensink'));
