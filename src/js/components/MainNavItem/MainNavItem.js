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
    name: 'Home',
    icon: null,
    iconClassName: null,
    channelExtraClassNames: null,
  }

  /**
   * Sets the background image style as the image url that was passed in as a prop
   * @returns {*}
   */
  backgroundImageStyle = () => {
    const { icon } = this.props;

    return icon
        ? { backgroundImage: `url(${icon})` }
        : null;
  }

  /**
   * Resolve the channel element's class names
   * @returns {string}
   */
  channelClassNames = () => {
    const { channelExtraClassNames, icon } = this.props;

    let channelClassNames = channelExtraClassNames;

    if (!channelExtraClassNames) {
      channelClassNames = [uiClassNames.blue];
    }

    if (icon) {
      channelClassNames = [];
    }

    return [
      uiClassNames.base,
      ...channelClassNames,
      ...(icon ? [uiClassNames.image] : []),
    ].join(' ');
  }

  /**
   * Resolve the content element's class names
   * @returns {string}
   */
  contentClassNames = () => {
    const { iconClassName } = this.props;

    return [
      ...(iconClassName ? [iconClassNames.svg, iconClassName] : [uiClassNames.content]),
    ].join(' ');
  }

  /**
   * @returns {string}
   */
  name = () => {
    const { name } = this.props;

    return name;
  }

  /**
   * @returns {string}
   */
  nameInitials = () => {
    const { icon, iconClassName } = this.props;

    return ((!(icon || iconClassName))
      ? this.name().split(' ').map((ar) => ar.charAt(0)).join('')
      : null);
  }

  render() {
    return (
      <div className="nav-item nav-item-server">
        <div className={this.channelClassNames()} style={this.backgroundImageStyle()}>
          <div className={this.contentClassNames()}>{this.nameInitials()}</div>
        </div>
        <div className="pip" />
        <div className="tool-tip">
          <div className="tool-tip-arrow tool-tip-arrow-left" />
          <div className="tool-tip-text tool-tip-text-lg">{this.name()}</div>
        </div>
      </div>
    );
  }
}

MainNavItem.propTypes = {
  name: PropTypes.string,
  iconClassName: PropTypes.string,
  icon: PropTypes.string,
  channelExtraClassNames: PropTypes.arrayOf(PropTypes.string),
};

export default MainNavItem;
