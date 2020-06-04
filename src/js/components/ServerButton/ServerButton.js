import React, { Component } from "react";
import PropTypes from 'prop-types';
import '../../../scss/components/ServerButton/ServerButton.scss';

class ServerButton extends Component {
  static defaultProps = {
    type: 'home',
    color: 'blue',
    title: 'Home',
    initials: '',
    image: false,
    active: false,
    svgClasses: {
      home: "svg svg-home",
      add: "svg svg-add",
      discover: "svg svg-discover",
      download: "svg svg-download"
    },
    buttonClasses: {
      blue: "nav-channel-blue",
      green: "nav-channel-green",
      initials: "nav-channel-initials",
      image: "nav-channel-image",
      active: "nav-channel-active"
    }
  }

  constructor(props) {
    super(props);
  }

  contentClass(type, initials, image, svgClasses) {
    if (initials || image) {
      return "nav-channel-content"
    }
    return svgClasses[type]
  }

  channelClass(color, active, image, initials, buttonClasses) {
    color = color === "green" ? buttonClasses.green : buttonClasses.blue;
    active = active ? buttonClasses.active : '';
    image = image ? buttonClasses.image : '';
    initials = initials ? buttonClasses.initials : '';

    return `nav-channel ${color} ${active} ${image} ${initials}`;
  }

  title = () => this.props.title;

  render() {
    const { type, color, initials, image, active, buttonClasses, svgClasses } = this.props;
    return (
      <button className="nav-item nav-item-server">
        <div className={ this.channelClass(color, active, image, initials, buttonClasses) }>
          <div className={ this.contentClass(type, initials, image, svgClasses) }>{ initials }</div>
        </div>
        <div className="pip"/>
        <div className="tool-tip">{ this.title() }</div>
      </button>
    )
  }
}

ServerButton.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  initials: PropTypes.string,
  image: PropTypes.bool,
  active: PropTypes.bool,
  buttonClasses: PropTypes.object,
  svgClasses: PropTypes.object
}

export default ServerButton;