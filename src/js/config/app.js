import { uiClassNames, iconClassNames } from '../components/MainNavItem/MainNavItem';
import { backgroundColorClassNames } from '../components/GroupNavDMButton/GroupNavDMButton';
import placeHolderAvatar from '../../img/discord-placeholder.png';

export default {
  authDetails: {
    clientId: '735260432536961114',
    clientSecret: 'yZS10WNIaQM_X2vDwm2KplGfkj-pbmVL',
    scope: 'identify guilds guilds.join',
    grantType: 'authorization_code',
    refreshType: 'refresh_token',
    redirectUri: 'https://chatosaurus.dev/oauthcallback',
    responseType: 'code',
  },
  discordUrls: {
    baseUrl: 'https://discord.com/api',
    authUrl: 'https://discord.com/api/oauth2/authorize',
    tokenUrl: 'https://discord.com/api/oauth2/token',
  },
  discordAPIResources: {
    client: 'client',
    bot: 'bot',
    user: '/users/@me',
    guilds: '/users/@me/guilds',
    channels: '/users/@me/guilds',
  },
  tokenTemplate: {
    accessTokenKey: 'access_token',
    expiresInKey: 'expires_in',
    refreshTokenKey: 'refresh_token',
    scopeKey: 'scope',
    tokenTypeKey: 'token_type',
  },
  paths: {
    mainPath: 'channels',
    homePath: '@me',
  },
  currentUser:
    {
      userName: 'pytho',
      userNameSuffix: '1234',
      avatar: placeHolderAvatar,
    },
  users: [
    {
      userName: 'pytho',
      avatar: placeHolderAvatar,
    },
    {
      userName: 'jakx',
      avatar: placeHolderAvatar,
    },
  ],
  chatRoomMessageLog: [
    {
      chatRoomId: '12345',
      messageLog: [
        {
          name: 'pytho',
          timeStamp: '2020-07-07T19:15:30',
          body: 'This is the Pytho chat log',
        },
      ],
    },
  ],
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
  iconButtons: [
    {
      type: 'mic',
      toolTipText: 'Mute',
      toolTipTextAlt: 'Unmute',
    },
    {
      type: 'deafen',
      toolTipText: 'Undeafen',
      toolTipTextAlt: 'Deafen',
    },
    {
      type: 'cog',
      toolTipText: 'User Settings',
    },
    {
      type: 'add-dm',
      toolTipText: 'New Group DM',
    },
    {
      type: 'inbox',
      toolTipText: 'Inbox',
    },
    {
      type: 'help',
      toolTipText: 'Help',
    },
    {
      type: 'voice-call',
      toolTipText: 'Start Voice Call',
    },
    {
      type: 'video-call',
      toolTipText: 'Start Video Call',
    },
    {
      type: 'pin',
      toolTipText: 'Pinned Messages',
    },
    {
      type: 'add-friend',
      toolTipText: 'Add Friends to DM',
    },
    {
      type: 'members',
      toolTipText: 'Member List',
    },
    {
      type: 'add',
    },
    {
      type: 'gift',
      toolTipText: 'Upgrade your friends! Gift them this awesome chat perks with Nitro',
    },
    {
      type: 'gif',
    },
    {
      type: 'emoji',
    },
    {
      type: 'reaction',
      toolTipText: 'Add Reaction',
    },
    {
      type: 'more',
      toolTipText: 'More',
    },
    {
      type: 'edit',
      toolTipText: 'Edit',
    },
  ],
  chatTopButtons: [
    {
      type: 'voice-call',
    },
    {
      type: 'video-call',
    },
    {
      type: 'pin',
    },
    {
      type: 'add-friend',
    },
    {
      type: 'members',
    },
    {
      type: 'search',
    },
    {
      type: 'inbox',
    },
    {
      type: 'help',
    },
  ],
  insertMainNavButtonsBeforeId: 'add-a-server',
  mainNavButtonPlaceholderImageSrc: placeHolderAvatar,
  chatLogPlaceholderText: [
    'Suspendisse viverra, orci nec eleifend.',
    'Ok',
    'In ut lobortis nibh, non rutrum dolor. Vestibulum ante ipsum priimis in faucibus orci'
    + ' luctus et ultrices posuere cubilia curae; Vivamus ut lectus egeet urna facilisis maximus'
    + ' a sit amet ex. Cras nunc sem, consectetur vel nunc vel, tempor blandit quam.',
    'Sed aliquam ipsum nec mauris consequat, id. ',
    'Lamcorper mauris sed faucibus faucibus. Fusce et rutrum arcu. Suspendisse vitae malesuada'
    + ' tellus. Aenean suscipit augue at justo viverra. ',
    'Luctus et ultrices posuere cubilia curae.',
  ],
  messageLogTemplate:
    {
      name: 'pytho',
      timeStamp: '2020-07-07T19:15:30',
      body: 'The random messages are not working',
    },
  messageLog: [
    {
      name: 'pytho',
      timeStamp: '2020-07-07T19:15:30',
      body: 'The Randomizer is not working',
    },
  ],
};
