import { uiClassNames, iconClassNames } from '../components/MainNavItem/MainNavItem';
import { backgroundColorClassNames } from '../components/GroupNavDMButton/GroupNavDMButton';
import placeHolderAvatar from '../../img/discord-placeholder.png';

export default {
  authDetails: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: 'identify guilds guilds.join bot',
    grantType: 'authorization_code',
    refreshType: 'refresh_token',
    redirectUri: 'https://chatosaurus.dev/oauthcallback',
    responseType: 'code',
  },
  discordUrls: {
    baseUrl: 'https://discordproxy.dev/api',
    authUrl: 'https://discord.com/api/oauth2/authorize',
    tokenUrl: 'https://discord.com/api/oauth2/token',
    appCDN: 'https://cdn.discordapp.com',
  },
  discordAPIResources: {
    currentUser: 'users/@me',
    userGuilds: 'users/@me/guilds',
    userChannels: 'users/@me/channels',
    pending: 'pending',
    bot: process.env.BOT,
    client: 'client',
    atMe: '@me',
    avatarPath: 'avatars',
    icons: 'icons',
    users: 'users',
    guilds: 'guilds',
    channels: 'channels',
    messages: 'messages',
    parentChannel: 4,
    textChannel: 0,
    voiceChannel: 2,
    dmChannel: 99,
  },
  tokenTemplate: {
    accessTokenKey: 'access_token',
    expiresInKey: 'expires_in',
    guild: 'guild',
    refreshTokenKey: 'refresh_token',
    scopeKey: 'scope',
    tokenTypeKey: 'token_type',
  },
  paths: {
    mainPath: 'channels',
    homePath: '@me',
    loginPath: 'login',
    errorPath: 'error',
  },
  channelNavButtonClasses: {
    svgBase: 'svg',
    svgHashWhite: 'svg-hash-white',
    svgHash: 'svg-hash',
    svgSpeaker: 'svg-speaker',
    svgPeople: 'svg-people',
    svgBackground: backgroundColorClassNames.avatarGrey,
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
          timestamp: '2020-07-07T19:15:30',
          content: 'This is the Pytho chat log',
        },
      ],
    },
  ],
  mainNavButtonTypes: {
    link: 'link',
    addServerButton: 'add-server-button',
  },
  mainNavButtons: [
    {
      id: '@me',
      name: 'Home',
      iconClassName: iconClassNames.home,
      channelExtraClassNames: [uiClassNames.blue, uiClassNames.separator],
      type: 'link',
      sort: 0,
    },
    {
      id: 'add-a-server',
      name: 'Add a Server',
      iconClassName: iconClassNames.add,
      channelExtraClassNames: [uiClassNames.green],
      type: 'add-server-button',
      sort: 1,
    },
    {
      id: 'download-apps',
      name: 'Download Apps',
      iconClassName: iconClassNames.download,
      channelExtraClassNames: [uiClassNames.green],
      sort: 3,
    },
    {
      id: 'server-discovery',
      name: 'Server Discovery',
      iconClassName: iconClassNames.discover,
      channelExtraClassNames: [uiClassNames.green, uiClassNames.separator],
      sort: 2,
    },
  ],
  insertMainNavButtonsBeforeId: 'add-a-server',
  groupNavDMButtons: [
    {
      id: '12345',
      name: 'Pytho',
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
  chatHeadText: {
    dmText: 'This is the beginning of your direct message history with ',
    channelText: 'This is the start of the #',
  },
  messageLogTemplate:
    {
      name: 'pytho',
      timestamp: '2020-07-07T19:15:30',
      content: 'The random messages are not working',
    },
  messageLog: [
    {
      name: 'pytho',
      timestamp: '2020-07-07T19:15:30',
      content: 'The Randomizer is not working',
    },
  ],
};
