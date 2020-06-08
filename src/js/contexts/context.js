import React, { Component, createContext } from "react";

export const GlobalContext = createContext('');

export class GlobalContextProvider extends Component {
  state = {
    currentServerButtonId: "home",
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