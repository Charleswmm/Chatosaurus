import { uiClassNames, iconClassNames } from "../components/MainNavButton/MainNavButton";

export const configuration = {
  mainNavButtons: [
    {
      id: 'home',
      title: 'Home',
      iconClassName: iconClassNames.home,
      channelExtraClassNames: [ uiClassNames.blue, uiClassNames.separator ],
      sort: 0,
    },
    {
      id: 'add-a-server',
      title: 'Add a Server',
      iconClassName: iconClassNames.add,
      channelExtraClassNames: [ uiClassNames.green ],
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
  insertMainNavButtonsBeforeId: 'add-a-server',
}