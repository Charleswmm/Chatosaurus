import React, { Component }  from "react";
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import '../scss/kitchensink.scss';
import Chat from "./components/Chat/Chat";
import MainNav from "./components/MainNav/MainNav";
import GroupNav from "./components/GroupNav/GroupNav";
import AddServerButton from "./components/AddServerButton/AddServerButton";
import MainNavButton from "./components/MainNavButton/MainNavButton";
import Config from "./utilities/Config";
import { configuration } from "./config/kitchensink";
import { GlobalContextWrapper } from "./contexts/GlobalContextWrapper";

class KitchenSink extends Component {
  render () {
    return (
      <GlobalContextWrapper Config={ new Config(configuration) } >
        <div className="dishes">
          <MainNavButton id={'test'} title={'Test Button'} iconClassName={''} imageSrc={''} channelExtraClassNames={['nav-channel-blue']} contentExtraClassNames={['']} sort={''} />
        </div>
        <div className="dishes">
          <AddServerButton id={'add-a-server'} title={'Add a Server'} iconClassName={'svg svg-add'} imageSrc={''} channelExtraClassNames={['nav-channel-green']} contentExtraClassNames={['']} sort={''} />
        </div>
        <div className="dishes">
          <MainNav />
        </div>
        <div className="dishes">
          <GroupNav />
        </div>
        <div className="dishes">
          <Chat />
        </div>
      </GlobalContextWrapper>
    );
  };
}

ReactDOM.render(<KitchenSink />, document.getElementById("kitchensink"));