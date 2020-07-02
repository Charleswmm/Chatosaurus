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
    key: 0,
  }

  func = {}

  constructor(props) {
    super(props);
    this.func = {
      joinBaseRoute: this.joinBaseRoute,
      safeUpdate: this.safeUpdate,
    };
  }

  /**
   * Used to create a url string from a global base route
   * @returns {string}
   * @param params
   */
  joinBaseRoute = (params) => {
    if (!Array.isArray(params)) {
      console.warn('`joinBaseRoute` requires an array to be passed'); // eslint-disable-line no-console
    }

    const { Config } = this.props;
    const { baseRoute } = Config.get(['baseRoute']);

    return [
      baseRoute.replace(/\/$/, ''),
      ...params,
    ].join('/');
  }

  /**
   * Used to rerender, useful when changing data in the configuration and not setting state
   */
  safeUpdate = () => {
    this.setState({ key: Math.random() });
  }

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
