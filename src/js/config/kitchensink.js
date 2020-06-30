import { backgroundColorClassNames } from '../components/GroupNavDMButton/GroupNavDMButton';
import { iconClassNames, uiClassNames } from '../components/MainNavItem/MainNavItem';

export default {
  mainNavButtons: [
    {
      id: 'home',
      title: 'Home',
      iconClassName: iconClassNames.home,
      channelExtraClassNames: [uiClassNames.blue, uiClassNames.separator],
      sort: 0,
    },
    {
      id: 'green',
      title: 'This is a green button',
      imageSrc: 'url',
      channelExtraClassNames: [uiClassNames.green],
      sort: 1,
    },
    {
      id: 'blue',
      title: 'This is a blue button',
      imageSrc: 'url',
      channelExtraClassNames: [uiClassNames.blue],
      sort: 2,
    },
    {
      id: 'add-a-server',
      title: 'Add a Server',
      iconClassName: iconClassNames.add,
      channelExtraClassNames: [uiClassNames.green],
      sort: 3,
    },
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
};
