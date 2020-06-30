import React from 'react';
import { NavLink } from 'react-router-dom';
import MainNavItem, { uiClassNames } from '../MainNavItem/MainNavItem';

const baseServerRoute = '/channels/';

export const serverLink = (id) => [
  baseServerRoute.replace(/\/$/, ''),
  id,
].join('/');

class ServerLink extends MainNavItem {
  render = () => (
    <div className="nav-item nav-item-server">
      <NavLink
        to={serverLink(this.props.id)}
        activeClassName={uiClassNames.active}
        style={this.backgroundImageStyle()}
        className={this.channelClassNames()}
        onClick={this.onClickHandler}
      >
        <div className={this.contentClassNames()}>{ this.titleInitials() }</div>
      </NavLink>
      <div className="pip" />
      <div className="tool-tip">{ this.title() }</div>
    </div>
  );
}

export default ServerLink;
