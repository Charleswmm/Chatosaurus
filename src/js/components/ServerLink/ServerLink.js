import React from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import MainNavItem, { uiClassNames } from '../MainNavItem/MainNavItem';

class ServerLink extends MainNavItem {
  static contextType = GlobalContext;

  render() {
    const { id } = this.props;
    const { joinRoutePath } = this.context;

    return (
      <div className="nav-item nav-item-server">
        <NavLink
          style={this.backgroundImageStyle()}
          className={this.channelClassNames()}
          onClick={this.onClickHandler}
          to={{
            pathname: joinRoutePath([id]),
            state: {
              loading: false,
            },
          }}
          activeClassName={uiClassNames.active}
        >
          <div className={this.contentClassNames()}>{this.nameInitials()}</div>
        </NavLink>
        <div className="pip" />
        <div className="tool-tip">
          <div className="tool-tip-arrow tool-tip-arrow-left" />
          <div className="tool-tip-text tool-tip-text-lg">{this.name()}</div>
        </div>
      </div>
    );
  }
}

export default ServerLink;
