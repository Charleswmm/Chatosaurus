import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../../../scss/components/GroupNav/GroupNav.scss';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import { btnClasses } from '../GroupNavDMButton/GroupNavDMButton';
import GroupNavDMButtons from '../GroupNavDMButtons/GroupNavDMButtons';

function GroupNav() {
  const { joinBaseRoute } = useContext(GlobalContext);

  return (
    <div className="nav-column nav-column-message">
      <div className="nav-group nav-group-top">
        <div className="nav-item nav-item-top">
          <button type="button" className="nav-btn-top">Find or start a conversation</button>
        </div>
      </div>
      <div className="nav-group nav-group-dm">
        <div className="nav-subgroup nav-subgroup-menu">
          <div className="nav-item nav-item-menu">
            <NavLink
              exact
              className="nav-link"
              to={joinBaseRoute(['@me'])}
              activeClassName={btnClasses.btnActive}
            >
              <div className="svg svg-friend" />
              <div className="link-text">Friends</div>
            </NavLink>
          </div>
          <div className="nav-item nav-item-menu">
            <div className="nav-link">
              <div className="svg svg-nitro" />
              <div className="link-text">Nitro</div>
            </div>
          </div>
        </div>
        <GroupNavDMButtons />
      </div>
      <div className="nav-group nav-group-foot">
        <div className="nav-foot" />
      </div>
    </div>
  );
}

export default GroupNav;
