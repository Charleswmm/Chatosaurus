import React, { Component, createContext } from "react";

export const GlobalContext = createContext('');

export class GlobalContextWrapper extends Component {
  state = {
    currentMainNavButtonId: "home",
  }

  /**
   *  Sets 'currentMainNavButtonId' in state to give the active server button its' active styling
   * @param id
   */
  setCurrentMainNavButtonId = (id) => this.setState({ currentMainNavButtonId: id });

  func = {
    setCurrentMainNavButtonId: this.setCurrentMainNavButtonId,
  }

  render() {
    return (
      <GlobalContext.Provider value={{  ...this.func, state: this.state, Config: this.props.Config, }}>
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}