import React, { Component } from "react";
import PropTypes from 'prop-types';
import '../../../scss/components/ServerButton/ServerButton.scss';

export const iconClassNames = {
  svg: 'svg',
  home: 'svg-home',
  add: 'svg-add',
  discover: 'svg-discover',
  download: 'svg-download',
}

export const uiClassNames = {
  base: 'nav-channel',
  content: 'nav-channel-content',
  active: 'nav-channel-active',
  blue: 'nav-channel-blue',
  green: 'nav-channel-green',
  image: 'nav-channel-image',
  separator: 'nav-channel-separator',
}

class ServerButton extends Component {
  static defaultProps = {
    title: 'Home',
    iconClassName: null,
    imageSrc: null,
    channelExtraClassNames: [],
    contentExtraClassNames: [],
  }

  /**
   * Resolve the channel element's class names
   * @returns {string}
   */
  channelClassNames = () => [
      uiClassNames.base,
      ...this.props.channelExtraClassNames,
      ...(this.props.imageSrc ? [uiClassNames.image] : []),
      ...(this.isActive() ? [uiClassNames.active] : [])
    ].join(' ');

  /**
   * Resolve the content element's class names
   * @returns {string}
   */
  contentClassNames = () => [
    ...(this.props.iconClassName ? [iconClassNames.svg, this.props.iconClassName] : [uiClassNames.content]),
    ...this.props.contentExtraClassNames,
  ].join(' ');

  title = () => this.props.title;

  titleInitials = () => (!(this.props.imageSrc||this.props.iconClassName))
    ? this.title().split(' ').map((ar)=> ar.charAt(0)).join('')
    : null;

  isActive = () => {
    return this.props.id === this.props.currentButtonId;
  }

  render() {
    const { setCurrentButtonId, id } = this.props;

    return (
      <button className="nav-item nav-item-server">
        <div className={ this.channelClassNames() } onClick={ () => setCurrentButtonId(id) } >
          <div className={ this.contentClassNames() }>{ this.titleInitials() }</div>
        </div>
        <div className="pip"/>
        <div className="tool-tip">{ this.title() }</div>
      </button>
    )
  }
}

ServerButton.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  iconClassName: PropTypes.string,
  imageSrc: PropTypes.string,
  isActive: PropTypes.bool,
  setCurrentButtonId: PropTypes.func,
  channelExtraClassNames: PropTypes.array,
  contentExtraClassNames: PropTypes.array,
  currentButtonId: PropTypes.string,
}

export default ServerButton;