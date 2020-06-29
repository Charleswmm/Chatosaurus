import React, { Component } from "react";
import PropTypes from 'prop-types';
import '../../../scss/components/MainNavItem/MainNavItem.scss';

export const iconClassNames = {
  svg: 'svg',
  home: 'svg-home',
  add: 'svg-plus',
  discover: 'svg-search',
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

class MainNavItem extends Component {

  static defaultProps = {
    title: 'Home',
    iconClassName: null,
    imageSrc: null,
    channelExtraClassNames: [],
    contentExtraClassNames: [],
  }

  /**
   * Sets the background image style as the image url that was passed in as a prop
   * @returns {*}
   */
  backgroundImageStyle = () => this.props.imageSrc ? { backgroundImage: `url(${ this.props.imageSrc })` } : null;

  /**
   * Resolve the channel element's class names
   * @returns {string}
   */
  channelClassNames = () => [
    uiClassNames.base,
    ...this.props.channelExtraClassNames,
    ...(this.props.imageSrc ? [uiClassNames.image] : []),
  ].join(' ');

  /**
   * Resolve the content element's class names
   * @returns {string}
   */
  contentClassNames = () => [
    ...(this.props.iconClassName ? [iconClassNames.svg, this.props.iconClassName] : [uiClassNames.content]),
    ...this.props.contentExtraClassNames,
  ].join(' ');

  /**
   * @returns {string}
   */
  title = () => this.props.title;

  /**
   * @returns {string}
   */
  titleInitials = () => (!(this.props.imageSrc||this.props.iconClassName))
    ? this.title().split(' ').map((ar)=> ar.charAt(0)).join('')
    : null;

  render = () => (
    <div className="nav-item nav-item-server">
      <div className={ this.channelClassNames() }>
        <div className={ this.contentClassNames() }>{ this.titleInitials() }</div>
      </div>
      <div className="pip"/>
      <div className="tool-tip">{ this.title() }</div>
    </div>
  );
}

MainNavItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  iconClassName: PropTypes.string,
  imageSrc: PropTypes.string,
  channelExtraClassNames: PropTypes.array,
  contentExtraClassNames: PropTypes.array,
}

export default MainNavItem;