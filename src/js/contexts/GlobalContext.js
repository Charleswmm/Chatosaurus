import React, { Component, createContext } from "react";
import {iconClassNames, uiClassNames} from "../components/MainNavButton/MainNavButton";

export const GlobalContext = createContext('');

export class GlobalContextProvider extends Component {
  state = {
    currentMainNavButtonId: "home",
    mainNavButtons: [
      {
        id: "home",
        title: "Home",
        iconClassName: iconClassNames.home,
        channelExtraClassNames: [ uiClassNames.blue, uiClassNames.separator ],
      },
      {
        id: "pythos-server",
        title: "Pytho's Server",
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
   *  Sets 'currentMainNavButtonId' in state to give the active server button its' active styling
   * @param id
   */
  setCurrentMainNavButtonId = (id) => this.setState({ currentMainNavButtonId: id });

  addNewServerButton = (button) => {
    const currentButtonsState = this.state.mainNavButtons

    currentButtonsState.splice(-3, 0, button)

    this.setState({ currentMainNavButtonId: button.id, mainNavButtons: currentButtonsState })
  }

  func = {
    setCurrentMainNavButtonId: this.setCurrentMainNavButtonId,
    addNewServerButton: this.addNewServerButton,
  }

  render() {
    return (
      <GlobalContext.Provider value={{ ...this.state, ...this.func }}>
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}