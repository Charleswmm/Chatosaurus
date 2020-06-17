import React, { Component, createContext } from "react";

export const GlobalContext = createContext('');

export class GlobalContextWrapper extends Component {
  constructor(props) {
    super(props);
    this._staticNavButtons = this.props.initialConfig.get(['mainNavButtons']).mainNavButtons;
  }

  state = {
    currentMainNavButtonId: "home",
    newServerButtons: [],
  }

  /**
   * Builds the main nav buttons by splicing new server buttons from state into the position after the 'home' button.
   * @returns {*[]}
   */
  buildMainNavButtons = () => {
    const mainNavButtons = [...this._staticNavButtons]
    // Adds new server buttons after the 'Home' button
    mainNavButtons.splice(1, 0, ...this.state.newServerButtons )
    return mainNavButtons
  }

  /**
   *  Sets 'currentMainNavButtonId' in state to give the active server button its' active styling
   * @param id
   */
  setCurrentMainNavButtonId = (id) => this.setState({ currentMainNavButtonId: id });

  /**
   * When this function is called from the AddServerButton, it will concat the new server 'button' into what is in state
   * @param button
   */
  addNewServerButton = (button) => {
    const newServerButtons = this.state.newServerButtons.concat([button])
    this.setState({ currentMainNavButtonId: button.id, newServerButtons: newServerButtons })
  }

  func = {
    setCurrentMainNavButtonId: this.setCurrentMainNavButtonId,
    addNewServerButton: this.addNewServerButton,
  }

  render() {
    return (
      <GlobalContext.Provider value={{ ...this.state, ...this.func, mainNavButtons: this.buildMainNavButtons(), }}>
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}