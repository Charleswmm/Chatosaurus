import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../../../scss/components/MainNavItem/MainNavItem.scss';

export const iconClassNames = {
  svg: 'svg',
  home: 'svg-discord',
  add: 'svg-plus',
  discover: 'svg-search',
  download: 'svg-download',
};

export const uiClassNames = {
  base: 'nav-channel',
  content: 'nav-channel-content',
  active: 'nav-channel-active',
  blue: 'nav-channel-blue',
  green: 'nav-channel-green',
  image: 'nav-channel-image',
  separator: 'nav-channel-separator',
};

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
  backgroundImageStyle = () => {
    const { imageSrc } = this.props;

    return imageSrc ? { backgroundImage: `url(${imageSrc})` } : null;
  }

  /**
   * Resolve the channel element's class names
   * @returns {string}
   */
  channelClassNames = () => {
    const { channelExtraClassNames, imageSrc } = this.props;

    return [
      uiClassNames.base,
      ...channelExtraClassNames,
      ...(imageSrc ? [uiClassNames.image] : []),
    ].join(' ');
  }

  /**
   * Resolve the content element's class names
   * @returns {string}
   */
  contentClassNames = () => {
    const { iconClassName, contentExtraClassNames } = this.props;

    return [
      ...(iconClassName ? [iconClassNames.svg, iconClassName] : [uiClassNames.content]),
      ...contentExtraClassNames,
    ].join(' ');
  }

  /**
   * @returns {string}
   */
  title = () => {
    const { title } = this.props;

    return title;
  }

  /**
   * @returns {string}
   */
  titleInitials = () => {
    const { imageSrc, iconClassName } = this.props;

    return ((!(imageSrc || iconClassName))
      ? this.title().split(' ').map((ar) => ar.charAt(0)).join('')
      : null);
  }

  render() {
    return (
      <div className="nav-item nav-item-server">
        <div className={this.channelClassNames()} style={this.backgroundImageStyle()}>
          <div className={this.contentClassNames()}>{ this.titleInitials() }</div>
        </div>
        <div className="pip" />
        <div className="tool-tip">{ this.title() }</div>
      </div>
    );
  }
}

MainNavItem.propTypes = {
  title: PropTypes.string,
  iconClassName: PropTypes.string,
  imageSrc: PropTypes.string,
  channelExtraClassNames: PropTypes.arrayOf(PropTypes.string),
  contentExtraClassNames: PropTypes.arrayOf(PropTypes.string),
};

export default MainNavItem;
