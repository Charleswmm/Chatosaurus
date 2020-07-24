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
    unSentMessage: [],
  }

  func = {}

  constructor(props) {
    super(props);
    this.func = {
      joinRoutePath: this.joinRoutePath,
      safeUpdate: this.safeUpdate,
      setChatInputState: this.setChatInputState,
      createRandomMessageLog: this.createRandomMessageLog,
      setAuthCodeInState: this.setAuthCodeInState,
    };
  }

  /**
   * Placeholder function that creates a random message log
   * @returns {any[]}
   */
  createRandomMessageLog = (id) => {
    const { Config } = this.props;
    const config = Config.get(['messageLogTemplate', 'chatLogPlaceholderText']);
    const { messageLogTemplate, chatLogPlaceholderText } = config;

    const numberOfMessages = 12;

    const numberOfLines = Math.floor(Math.random() * numberOfMessages);
    const randomArrayLength = new Array(numberOfLines).fill(0);
    const randomArray = randomArrayLength.map(() => Math.floor(Math.random() * 6));

    const numberOfDays = randomArray.length < (numberOfMessages / 2)
      ? (numberOfMessages / 6)
      : (numberOfMessages / 4);
    const numberOfMinutes = randomArray.length < (numberOfMessages / 2) ? 12 : 24;

    const newRandomMessageLog = randomArray.map((e) => {
      const randomDay = Math.floor(Math.random() * numberOfDays);
      const randomMinutes = Math.floor(Math.random() * numberOfMinutes + 1);

      const theTime = new Date();
      theTime.setDate(theTime.getDate() - randomDay);
      theTime.setMinutes(theTime.getMinutes() - randomMinutes);
      const newTime = theTime.toISOString();

      return {
        ...messageLogTemplate,
        timeStamp: newTime,
        body: chatLogPlaceholderText[e],
      };
    });

    const { chatRoomMessageLog } = Config.get(['chatRoomMessageLog']);

    Config.set({
      chatRoomMessageLog: [
        ...chatRoomMessageLog,
        {
          chatRoomId: id,
          messageLog: newRandomMessageLog,
        },
      ],
    });
  }

  /**
   * Used to create a url string from a global base route
   * @returns {string}
   * @param params
   */
  joinRoutePath = (params) => {
    if (!Array.isArray(params)) {
      console.warn('`joinRoutePath` requires an array to be passed'); // eslint-disable-line no-console
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

  /**
   * Used to set the unsent chat dialogue into state
   * @param id
   * @param input
   */
  setChatInputState = (id, input) => {
    const { unSentMessage } = this.state;
    const findUnSentMessage = unSentMessage.find((e) => e.chatId === id);

    if (findUnSentMessage) {
      const allOtherUnSentMessage = unSentMessage.filter((e) => e.chatId !== id);

      this.setState({
        unSentMessage: [
          ...allOtherUnSentMessage,
          {
            ...findUnSentMessage,
            chatInput: input,
          },
        ],
      });
      return;
    }

    this.setState({
      unSentMessage: [
        ...unSentMessage,
        {
          chatId: id,
          chatInput: input,
        },
      ],
    });
  }

  setAuthCodeInState = (code) => {
    this.setState({
      authCode: code,
    });
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
