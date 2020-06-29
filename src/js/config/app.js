import { uiClassNames, iconClassNames } from "../components/MainNavItem/MainNavItem";
import { backgroundColorClassNames } from "../components/GroupNavDMButton/GroupNavDMButton";
import placeHolderImage from '../../img/discord-placeholder.png';

export const configuration = {
  mainNavButtons: [
    {
      id: '@me',
      title: 'Home',
      iconClassName: iconClassNames.home,
      channelExtraClassNames: [ uiClassNames.blue, uiClassNames.separator ],
      type: 'link',
      sort: 0,
    },
    {
      id: 'add-a-server',
      title: 'Add a Server',
      iconClassName: iconClassNames.add,
      channelExtraClassNames: [ uiClassNames.green ],
      type: 'add-server-button',
      sort: 1,
    },
    {
      id: 'server-discovery',
      title: 'Server Discovery',
      iconClassName: iconClassNames.discover,
      channelExtraClassNames: [ uiClassNames.green, uiClassNames.separator ],
      sort: 2,
    },
    {
      id: 'download-apps',
      title: 'Download Apps',
      iconClassName: iconClassNames.download,
      channelExtraClassNames: [ uiClassNames.green ],
      sort: 3,
    }
  ],
  groupNavDMButtons: [
    {
      id: 'pytho',
      title: 'Pytho',
      avatarSrc: 'url',
      backgroundColor: backgroundColorClassNames.avatarBlue,
    },
  ],
  insertMainNavButtonsBeforeId: 'add-a-server',
  mainNavButtonPlaceholderImageSrc: placeHolderImage,
}
