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

export const staticButtons = [
  {
    title: "Home",
    iconClassName: iconClassNames.home,
    channelExtraClassNames: [ uiClassNames.blue, uiClassNames.separator, ],
  },
  {
    title: "Add a Server",
    iconClassName: iconClassNames.add,
    channelExtraClassNames: [ uiClassNames.green ],
  },
  {
    title: "Server Discovery",
    iconClassName: iconClassNames.discover,
    channelExtraClassNames: [ uiClassNames.green, uiClassNames.separator, ],
  },
  {
    title: "Download Apps",
    iconClassName: iconClassNames.download,
    channelExtraClassNames: [ uiClassNames.green ],
  },
]

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
      ...(this.props.isActive ? [uiClassNames.active] : [])
    ].join(' ')

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

  clickHandler = () => {
    this.props.getServerButtonClick(this.props.title)
  }

  render() {
    return (
      <button className="nav-item nav-item-server">
        <div className={ this.channelClassNames() } onClick={this.clickHandler} >
          <div className={ this.contentClassNames() }>{ this.titleInitials() }</div>
        </div>
        <div className="pip"/>
        <div className="tool-tip">{ this.title() }</div>
      </button>
    )
  }
}

ServerButton.propTypes = {
  title: PropTypes.string,
  iconClassName: PropTypes.string,
  imageSrc: PropTypes.string,
  isActive: PropTypes.bool,
  getServerButtonClick: PropTypes.func,
  channelExtraClassNames: PropTypes.array,
  contentExtraClassNames: PropTypes.array,
}

export default ServerButton;