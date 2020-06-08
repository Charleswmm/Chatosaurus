import React, { Component } from "react";
import '../../../scss/components/ServerNav/ServerNav.scss';
import ServerButton, { iconClassNames, uiClassNames } from "../ServerButton/ServerButton";

class ServerNav extends Component {
  state = {
    currentButtonId: "home",
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
  /**
   * This function is called by the button child component and sets the state of 'active' to the title of the component
   * @param id
   */
  setCurrentButtonId = (id) => this.setState({ currentButtonId: id });

  render() {
    const { buttons } = this.state;

    return (
      <div className="nav-column nav-column-server">
          <div className="nav-group">
            <ServerButtons buttons={ buttons } setCurrentButtonId={ this.setCurrentButtonId } currentButtonId={ this.state.currentButtonId } />
          </div>
      </div>
    )
  }
}

const ServerButtons = (props) => {
  const { buttons, setCurrentButtonId, currentButtonId } = props;

  return buttons.map((button, index) =>
    <ServerButton
      key={index.toString()}
      setCurrentButtonId={setCurrentButtonId}
      currentButtonId={currentButtonId}
      {...button}
    />
  )
};

export default ServerNav;
