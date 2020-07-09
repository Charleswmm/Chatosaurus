import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../../../scss/components/GroupNavDMButton/GroupNavDMButton.scss';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

export const avatarClassNames = {
  baseAvatar: 'avatar',
  noAvatar: 'svg-people',
  availableAvatar: 'svg-discord',
};

export const btnClasses = {
  btnBase: 'nav-link',
  btnActive: 'nav-link-active',
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

  removeButtonClickHandler = () => {
    const { removeButtonFunc, id } = this.props;

    return removeButtonFunc(id);
  }

  render() {
    const { id } = this.props;
    const { joinRoutePath } = this.context;

    return (
      <div className="nav-item nav-item-dm">
        <NavLink
          className={btnClasses.btnBase}
          to={joinRoutePath(['@me', id])}
          activeClassName={btnClasses.btnActive}
        >
          <div className={this.avatar()} />
          <div className="link-text">
            <div className="link-title">{this.title()}</div>
            <div className="link-subtitle">{this.members()}</div>
          </div>
        </NavLink>
        <div className="nav-remove">
          <div className="svg svg-cross" onClick={this.removeButtonClickHandler} />
        </div>
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
