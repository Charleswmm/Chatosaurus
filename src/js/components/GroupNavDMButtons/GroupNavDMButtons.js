import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import '../../../scss/components/GroupNavDMButtons/GroupNavDMButtons.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import GroupNavDMButton, { backgroundColorClassNames } from '../GroupNavDMButton/GroupNavDMButton';

class GroupNavDMButtons extends Component {
  static contextType = GlobalContext;

  /**
   * Placeholder function to create new random buttons
   * @returns {{backgroundColor: *, avatarSrc: string, id: string, title: string}}
   */
  randomNewGroupNavDMButton = () => {
    let randomId = Math.floor(Math.random() * 90000 + 10000);
    const addAvatarSrc = randomId > 80000 ? 'url' : '';
    const backgroundColors = Object.values(backgroundColorClassNames);
    const randomBackgroundColor = backgroundColors[Math.floor(randomId / 20000 + 1)];
    const randomMembers = Math.floor(randomId / 25000);
    randomId = randomId.toString();

    return {
      id: randomId,
      title: 'Unnamed',
      avatarSrc: `${addAvatarSrc}`,
      members: randomMembers,
      backgroundColor: `${randomBackgroundColor}`,
    };
  }

  /**
   * Adds a new random group nav DM button to the configuration
   */
  addButtonClickHandler = () => {
    const { history } = this.props;
    const { Config, joinRoutePath, createRandomMessageLog } = this.context;
    const { paths: { homePath } } = Config.get(['paths']);
    const button = this.randomNewGroupNavDMButton();

    Config.set({
      groupNavDMButtons: [button, ...this.getGroupNavDMButtons()],
    });

    // Creates a place holder message log and places it on the "config"
    createRandomMessageLog(button.id);

    history.push({
      pathname: joinRoutePath([homePath, button.id]),
      state: {
        loading: false,
      },
    });
  }

  /**
   * Called by the children to remove them selves from the configuration
   * @param id
   */
  removeButtonClickHandler = (id) => {
    if (!id) {
      // eslint-disable-next-line no-console
      console.warn('`removeButtonClickHandler` requires an id to be passed');
    }
    const { location, history } = this.props;
    const { Config, safeUpdate, joinRoutePath } = this.context;
    const { paths: { homePath } } = Config.get(['paths']);
    const newGroupNavDMButtons = this.getGroupNavDMButtons().filter((button) => button.id !== id);

    Config.set({
      groupNavDMButtons: newGroupNavDMButtons,
    });

    const currentPageId = location.pathname.split('/').pop();

    if (id === currentPageId) {
      history.push({
        pathname: joinRoutePath([homePath]),
        state: {
          loading: false,
        },
      });
    }
    safeUpdate();
  }

  /**
   * Gets the button properties from config
   * @returns {*}
   */
  getGroupNavDMButtons = () => {
    const { Config } = this.context;
    const { groupNavDMButtons } = Config.get(['groupNavDMButtons']);

    return groupNavDMButtons;
  }

  render() {
    return (
      <div className="nav-subgroup nav-subgroup-dm">
        <div className="nav-item nav-item-head">
          <div className="flex-grow">Direct Messages</div>
          <button type="button" className="add-group-dm" onClick={this.addButtonClickHandler}>
            <div className="svg svg-plus" />
            <div className="tool-tip">
              <div className="tool-tip-text tool-tip-text-sm">Create DM</div>
              <div className="tool-tip-arrow tool-tip-arrow-bottom" />
            </div>
          </button>
        </div>
        <CreateGroupNavDMButtons
          buttons={this.getGroupNavDMButtons()}
          removeButtonFunc={this.removeButtonClickHandler}
        />
      </div>
    );
  }
}

const CreateGroupNavDMButtons = (props) => {
  const { buttons, removeButtonFunc } = props;

  return buttons.map((button, index) => (
    <GroupNavDMButton
      key={index.toString()}
      removeButtonFunc={removeButtonFunc}
      id={button.id}
      title={button.title}
      members={button.members}
      avatarSrc={button.avatarSrc}
      backgroundColor={button.backgroundColor}
    />
  ));
};

GroupNavDMButtons.propTypes = {
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

GroupNavDMButtons.defaultProps = {
  history: null,
  location: null,
};

export default withRouter(GroupNavDMButtons);
