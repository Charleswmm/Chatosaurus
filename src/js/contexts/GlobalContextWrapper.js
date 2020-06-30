import PropTypes from 'prop-types';
import React, { Component, createContext } from 'react';
import ConfigClass from '../utilities/Config';

export const GlobalContext = createContext('');

export class GlobalContextWrapper extends Component {
  static defaultProps = {
    Config: null,
    children: null,
  }

  state = {
    currentGroupNavDMButtonId: '',
  }

  func = {}

  constructor(props) {
    super(props);
    this.func = {
      setCurrentGroupNavDMButtonId: this.setCurrentGroupNavDMButtonId,
    };
  }

  setCurrentGroupNavDMButtonId = (id) => this.setState({ currentGroupNavDMButtonId: id });

  render() {
    const { Config, children } = this.props;

    return (
      <GlobalContext.Provider
        value={{
          ...this.func,
          state: this.state,
          Config,
        }}
      >
        { children }
      </GlobalContext.Provider>
    );
  }
}

GlobalContextWrapper.propTypes = {
  Config: PropTypes.instanceOf(ConfigClass),
  children: PropTypes.node,
};
