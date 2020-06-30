import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../../../scss/components/GroupNavDMButton/GroupNavDMButton.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

const avatarClassNames = {
  baseAvatar: 'avatar',
  noAvatar: 'avatar-default',
  availableAvatar: 'avatar-image',
};

const btnClasses = {
  btnBase: 'nav-btn',
  btnActive: 'nav-btn-active',
};

export const backgroundColorClassNames = {
  avatarBlue: 'background-brand-blue',
  avatarGreen: 'background-brand-green',
  avatarOrange: 'background-brand-orange',
  avatarPurple: 'background-brand-purple',
  avatarRed: 'background-brand-red',
  avatarYellow: 'background-brand-yellow',
};

class GroupNavDMButton extends Component {
  static contextType = GlobalContext;

  static defaultProps = {
    id: null,
    title: 'Unnamed',
    members: null,
    avatarSrc: null,
    backgroundColor: backgroundColorClassNames.avatarBlue,
    removeButtonFunc: null,
  }

  /**
   * Resolve button classes
   * @returns {string}
   */
  btnClasses = () => [
    btnClasses.btnBase,
    (this.isActive() ? btnClasses.btnActive : ''),
  ].join(' ');

  isActive = () => {
    const { state } = this.context;
    const { id } = this.props;

    return id === state.currentGroupNavDMButtonId;
  }

  /**
   * Resolves classes for the avatar if there is a avatar
   * @returns {string}
   */
  avatar = () => {
    const { avatarSrc, backgroundColor } = this.props;

    return [
      avatarClassNames.baseAvatar,
      ...(
        avatarSrc
          ? [avatarClassNames.availableAvatar]
          : [avatarClassNames.noAvatar, backgroundColor]
      ),
    ].join(' ');
  }

  title = () => {
    const { title } = this.props;

    return title;
  }

  members = () => {
    const { members } = this.props;

    return (!members ? '' : `${members} Member${members === 1 ? '' : 's'}`);
  }

  onClickHandler = () => {
    const { setCurrentGroupNavDMButtonId } = this.context;
    const { id } = this.props;

    return setCurrentGroupNavDMButtonId(id);
  }

  removeButtonClickHandler = () => {
    const { removeButtonFunc, id } = this.props;

    return removeButtonFunc(id);
  }

  render() {
    return (
      <div className="nav-item nav-item-dm">
        <button type="button" className={this.btnClasses()}>
          <div className="btn-content" onClick={this.onClickHandler}>
            <div className={this.avatar()} />
            <div className="btn-text">
              <div className="btn-title">{this.title()}</div>
              <div className="btn-subtitle">{this.members()}</div>
            </div>
          </div>
          <div className="svg svg-cross" onClick={this.removeButtonClickHandler} />
        </button>
      </div>
    );
  }
}

GroupNavDMButton.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  members: PropTypes.number,
  avatarSrc: PropTypes.string,
  backgroundColor: PropTypes.string,
  removeButtonFunc: PropTypes.func,
};

export default GroupNavDMButton;
