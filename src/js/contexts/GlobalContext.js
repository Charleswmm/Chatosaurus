import React, { Component, createContext } from "react";
import {iconClassNames, uiClassNames} from "../components/ServerButton/ServerButton";

export const GlobalContext = createContext('');

export class GlobalContextProvider extends Component {
  state = {
    currentServerButtonId: "home",
    serverNavButtons: [
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
   *  Sets 'currentServerButtonId' in state to give the active server button its' active styling
   * @param id
   */
  setCurrentServerButtonId = (id) => this.setState({ currentServerButtonId: id });

  render() {
    return (
      <GlobalContext.Provider value={{ ...this.state, setCurrentServerButtonId: this.setCurrentServerButtonId }}>
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}