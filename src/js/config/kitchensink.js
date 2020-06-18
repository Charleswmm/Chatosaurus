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
      id: 'green',
      title: 'This is a green button',
      iconClassName: iconClassNames.add,
      channelExtraClassNames: [ uiClassNames.green ]
    },
    {
      id: 'blue',
      title: 'This is a blue button',
      iconClassName: iconClassNames.add,
      channelExtraClassNames: [ uiClassNames.blue ]
    },
  ]
}