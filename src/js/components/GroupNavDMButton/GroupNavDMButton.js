import React, { Component } from "react";
import '../../../scss/components/GroupNavDMButton/GroupNavDMButton.scss';
import PropTypes from "prop-types";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";

const avatarClassNames = {
  baseAvatar: 'avatar',
  noAvatar: 'avatar-default',
  availableAvatar: 'avatar-image',
}

const btnClasses = {
  btnBase: 'btn btn-nav-item',
  btnActive: 'btn-nav-item-active',
}

export const backgroundColorClassNames = {
  avatarBlue: 'background-brand-blue',
  avatarGreen: 'background-brand-green',
  avatarOrange: 'background-brand-orange',
  avatarPurple: 'background-brand-purple',
  avatarRed: 'background-brand-red',
  avatarYellow: 'background-brand-yellow',
}

class GroupNavDMButton extends Component {
  static contextType = GlobalContext;
  static defaultProps = {
    title: 'Unnamed',
    backgroundColor: backgroundColorClassNames.avatarBlue,
  }

  /**
   * Resolve button classes
   * @returns {string}
   */
  btnClasses = () => [
    btnClasses.btnBase,
    ( this.isActive() ? btnClasses.btnActive : '' )
  ].join(' ');

  isActive = () => this.props.id === this.context.state.currentGroupNavDMButtonId;

  /**
   * Resolves classes for the avatar if there is a avatar
   * @returns {string}
   */
  avatar = () => [
    avatarClassNames.baseAvatar,
    ...( this.props.avatarSrc ? [ avatarClassNames.availableAvatar ] : [ avatarClassNames.noAvatar, this.props.backgroundColor ] ),
  ].join(' ');

  title = () => this.props.title;

  members = () => !this.props.members
    ? ''
    : this.props.members + ' Member' + ( this.props.members === 1
      ? ''
      :'s' );

  onClickHandler = () => this.context.setCurrentGroupNavDMButtonId(this.props.id);

  removeButtonClickHandler = () => this.props.removeButtonFunc(this.props.id);

  render() {
    return (
      <div className="nav-item nav-item-dm">
        <button className={ this.btnClasses() }>
          <div className="btn-nav-item-content flex-grow" onClick={ this.onClickHandler }>
            <div className={ this.avatar() }/>
            <div className="btn-nav-item-text flex-grow">
              <div className="flex-grow">{ this.title() }</div>
              <div className="btn-nav-item-subtext">{ this.members() }</div>
            </div>
          </div>
          <div className="svg svg-cross" onClick={ this.removeButtonClickHandler }/>
        </button>
      </div>
    )
  }
}

GroupNavDMButton.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  members: PropTypes.number,
  avatarSrc: PropTypes.string,
  backgroundColor: PropTypes.string,
  removeButtonFunc: PropTypes.func,
}

export default GroupNavDMButton;
