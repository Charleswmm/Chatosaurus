import { uiClassNames, iconClassNames } from "../components/MainNavButton/MainNavButton";

export const configuration = {
  mainNavButtons: [
    {
      id: 'home',
      title: 'Home',
      iconClassName: iconClassNames.home,
      channelExtraClassNames: [ uiClassNames.blue, uiClassNames.separator ]
    },
    {
      id: 'add-a-server',
      title: 'Add a Server',
      iconClassName: iconClassNames.add,
      channelExtraClassNames: [ uiClassNames.green ]
    },
    {
      id: 'server-discovery',
      title: 'Server Discovery',
      iconClassName: iconClassNames.discover,
      channelExtraClassNames: [ uiClassNames.green, uiClassNames.separator ]
    },
    {
      id: 'download-apps',
      title: 'Download Apps',
      iconClassName: iconClassNames.download,
      channelExtraClassNames: [ uiClassNames.green ]
    }
  ]
}