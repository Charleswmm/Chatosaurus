import React, { Component } from "react";
import PropTypes from 'prop-types';
import '../../../scss/components/ServerButton/ServerButton.scss';
import { GlobalContext } from "../../contexts/context";

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
  static contextType = GlobalContext;
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
    return this.props.id === this.context.currentServerButtonId;
  }

  render() {
    const { id } = this.props;
    const { setCurrentServerButtonId } = this.context;

    return (
      <button className="nav-item nav-item-server">
        <div className={ this.channelClassNames() } onClick={ () => setCurrentServerButtonId(id) } >
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
  channelExtraClassNames: PropTypes.array,
  contentExtraClassNames: PropTypes.array,
}

export default ServerButton;