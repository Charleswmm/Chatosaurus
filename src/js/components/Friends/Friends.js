import React from 'react';
import '../../../scss/components/Friends/Friends.scss';
import { TopItem } from '../ChatTop/ChatTop';

const Friends = () => (
  <main className="chat">
    <div className="chat-top">
      <nav className="nav-row">
        <div className="nav-group nav-group-friends">
          <div className="nav-item nav-item-first">
            <div className="svg svg-friend" />
            <div className="nav-text">Friends</div>
          </div>
          <div className="nav-item friends-divider" />
          <div className="nav-item">
            <div className="nav-subtext nav-subtext-active">Online</div>
          </div>
          <div className="nav-item">
            <div className="nav-subtext">All</div>
          </div>
          <div className="nav-item">
            <div className="nav-subtext">Pending</div>
          </div>
          <div className="nav-item">
            <div className="nav-subtext">Blocked</div>
          </div>
          <div className="nav-item">
            <div className="nav-subtext nav-subtext-green">Add Friend</div>
          </div>
          <div className="nav-item flex-grow" />
          <TopItem title="New Group DM" iconClass="svg svg-add-dm" />
          <div className="nav-item friends-divider" />
          <TopItem title="Inbox" iconClass="svg svg-inbox" />
          <TopItem title="Help" iconClass="svg svg-help" />
        </div>
      </nav>
    </div>
    <div className="chat-body chat-body-friends">
      <div className="svg-wumpus" />
      <div className="wumpus-caption">No one&apos;s around to play with Wumpus.</div>
    </div>
  </main>
);

export default Friends;
