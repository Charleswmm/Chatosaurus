import React, { Component, createContext } from "react";

const Context = createContext();

export class ContextProvider extends Component {
  state= {

  }
  render() {
    return (
      <Context.Provider>
        {this.props.children}
      </Context.Provider>
    )
  }
}