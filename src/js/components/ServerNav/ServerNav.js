import React, { Component } from "react";
import '../../../scss/components/ServerNav/ServerNav.scss';
import ServerButton, { iconClassNames, uiClassNames } from "../ServerButton/ServerButton";

class ServerNav extends Component {
  state = {
    buttons: [
      {
        id: "home",
        title: "Home",
        iconClassName: iconClassNames.home,
        channelExtraClassNames: [ uiClassNames.blue, uiClassNames.separator ],
      },
      {
        id: "pythos-server",
        title: "Pytho's Server",
        imageSrc: 'url',
        channelExtraClassNames: [ uiClassNames.blue ],
      },
      {
        id: "jakxs-server",
        title: "Jakx's Server",
        imageSrc: null,
        channelExtraClassNames: [ uiClassNames.blue ],
      },
      {
        id: "add-a-server",
        title: "Add a Server",
        iconClassName: iconClassNames.add,
        channelExtraClassNames: [ uiClassNames.green ],
      },
      {
        id: "server-discovery",
        title: "Server Discovery",
        iconClassName: iconClassNames.discover,
        channelExtraClassNames: [ uiClassNames.green, uiClassNames.separator ],
      },
      {
        id: "download-apps",
        title: "Download Apps",
        iconClassName: iconClassNames.download,
        channelExtraClassNames: [ uiClassNames.green ],
      },
    ],
  }

  render() {
    const { buttons } = this.state;

    return (
      <div className="nav-column nav-column-server">
          <div className="nav-group">
            <ServerButtons buttons={ buttons } />
          </div>
      </div>
    )
  }
}

const ServerButtons = (props) => {
  const { buttons } = props;

  return buttons.map((button, index) =>
    <ServerButton
      key={index.toString()}
      {...button}
    />
  )
};

export default ServerNav;
