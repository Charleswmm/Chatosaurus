import React, { Component, createContext } from "react";

export const GlobalContext = createContext('');

export class GlobalContextWrapper extends Component {
  state = {
    currentGroupNavDMButtonId: '',
  }

  setCurrentGroupNavDMButtonId = (id) => this.setState({ currentGroupNavDMButtonId: id });

  func = {
    setCurrentGroupNavDMButtonId: this.setCurrentGroupNavDMButtonId,
  }

  render() {
    return (
      <GlobalContext.Provider value={{  ...this.func, state: this.state, Config: this.props.Config, }}>
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}