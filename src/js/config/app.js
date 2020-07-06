import { uiClassNames, iconClassNames } from '../components/MainNavItem/MainNavItem';
import { backgroundColorClassNames } from '../components/GroupNavDMButton/GroupNavDMButton';
import placeHolderImage from '../../img/discord-placeholder.png';

export default {
  baseRoute: '/channels/',
  homeRoute: '@me',
  mainNavButtons: [
    {
      id: '@me',
      title: 'Home',
      iconClassName: iconClassNames.home,
      channelExtraClassNames: [uiClassNames.blue, uiClassNames.separator],
      type: 'link',
      sort: 0,
    },
    {
      id: 'add-a-server',
      title: 'Add a Server',
      iconClassName: iconClassNames.add,
      channelExtraClassNames: [uiClassNames.green],
      type: 'add-server-button',
      sort: 1,
    },
    {
      id: 'download-apps',
      title: 'Download Apps',
      iconClassName: iconClassNames.download,
      channelExtraClassNames: [uiClassNames.green],
      sort: 3,
    },
    {
      id: 'server-discovery',
      title: 'Server Discovery',
      iconClassName: iconClassNames.discover,
      channelExtraClassNames: [uiClassNames.green, uiClassNames.separator],
      sort: 2,
    },
  ],
  groupNavDMButtons: [
    {
      id: '12345',
      title: 'Pytho',
      avatarSrc: 'url',
      backgroundColor: backgroundColorClassNames.avatarBlue,
    },
  ],
  chatTopButtons: [
    {
      title: 'Start Voice Call',
      iconClass: 'svg svg-voice-call',
    },
    {
      title: 'Start Video Call',
      iconClass: 'svg svg-video-call',
    },
    {
      title: 'Pinned Messages',
      iconClass: 'svg svg-pin',
    },
    {
      title: 'Add Friends to DM',
      iconClass: 'svg svg-add-friend',
    },
    {
      title: 'Member List',
      iconClass: 'svg svg-people',
    },
    {
      type: 'search',
    },
    {
      title: 'Inbox',
      iconClass: 'svg svg-inbox',
    },
    {
      title: 'Help',
      iconClass: 'svg svg-help',
    },
  ],
  insertMainNavButtonsBeforeId: 'add-a-server',
  mainNavButtonPlaceholderImageSrc: placeHolderImage,
};
