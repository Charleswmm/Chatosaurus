import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';

export const ChannelNavButton = ({ button, hideChildrenId }) => {
  const { Config, joinRoutePath } = useContext(GlobalContext);
  const config = Config.get(['channelNavButtonClasses', 'discordAPIResources']);
  const { channelNavButtonClasses, discordAPIResources } = config;
  const { svgBase, svgHash, svgSpeaker } = channelNavButtonClasses;
  const { voiceChannel } = discordAPIResources;
  const { name, id, type, guild_id: guildId, parent_id: parentId } = button;

  const { pathname } = useLocation();
  const pathNames = pathname.split('/');
  const matchId = pathNames.find((e) => e === id);

  const svgType = type === voiceChannel ? svgSpeaker : svgHash;
  const svgClass = [svgBase, svgType].join(' ');

  const hideStyle = {
    display: 'none',
  };

  const isHidden = hideChildrenId.find((e) => e === parentId);

  const hide = isHidden && id !== matchId ? hideStyle : null;

  const voiceChannelLink = (e) => {
    if (type === voiceChannel) {
      e.preventDefault();
    }
  };

  return (
    <div style={hide} className="nav-item nav-item-channel">
      <NavLink
        onClick={voiceChannelLink}
        className="btn"
        activeClassName="btn-active"
        to={{
          pathname: joinRoutePath([guildId, id]),
          state: {
            loading: false,
          },
        }}
      >
        <div className={svgClass} />
        <div className="btn-text">{name}</div>
        <div className="svg svg-add-friend">
          <div className="tool-tip">
            <div className="tool-tip-text tool-tip-text-sm">Create Invite</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </div>
        <div className="svg svg-cog">
          <div className="tool-tip">
            <div className="tool-tip-text tool-tip-text-sm">Edit Channel</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export const ChannelNavParent = ({ button, hideChildren, hideChildrenId }) => {
  const { name, id } = button;

  const hiddenChildren = hideChildrenId.find((e) => e === id);

  const rotate = {
    transform: 'rotate(-90deg)',
  };

  const rotateSvg = hiddenChildren ? rotate : null;

  const parentClickHandler = () => {
    hideChildren(id);
  };

  return (
    <div className="nav-item nav-item-parent">
      <button
        type="button"
        className="btn"
        onClick={parentClickHandler}
      >
        <div style={rotateSvg} className="svg svg-arrow-grey" />
        <div className="btn-text">{name}</div>
        <div className="svg svg-plus">
          <div className="tool-tip">
            <div className="tool-tip-text tool-tip-text-sm">Create Channel</div>
            <div className="tool-tip-arrow tool-tip-arrow-bottom" />
          </div>
        </div>
      </button>
    </div>
  );
};

ChannelNavButton.propTypes = {
  button: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.number,
    name: PropTypes.string,
    guild_id: PropTypes.string,
    parent_id: PropTypes.string,
  }),
  hideChildrenId: PropTypes.arrayOf(PropTypes.string),
};

ChannelNavButton.defaultProps = {
  button: null,
  hideChildrenId: [],
};

ChannelNavParent.propTypes = {
  button: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.number,
    name: PropTypes.string,
    guild_id: PropTypes.string,
  }),
  hideChildren: PropTypes.func,
  hideChildrenId: PropTypes.arrayOf(PropTypes.string),
};

ChannelNavParent.defaultProps = {
  button: null,
  hideChildren: null,
  hideChildrenId: [],
};

export default ChannelNavButton;
