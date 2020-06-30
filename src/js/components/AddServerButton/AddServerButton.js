import { withRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import MainNavButton from '../MainNavButton/MainNavButton';
import { uiClassNames } from '../MainNavItem/MainNavItem';
import { serverLink } from '../ServerLink/ServerLink';

class AddServerButton extends MainNavButton {
  static contextType = GlobalContext;

  onClickHandler = () => {
    // New server button template
    const config = this.context.Config.get([
      'mainNavButtons',
      'insertMainNavButtonsBeforeId',
      'mainNavButtonPlaceholderImageSrc',
    ]);

    const {
      mainNavButtons,
      insertMainNavButtonsBeforeId,
      mainNavButtonPlaceholderImageSrc,
    } = config;

    // Random number for placeholder IDs and random imageSrc
    let randomId = Math.floor(Math.random() * 10000);
    const addImageSrc = randomId > 7000 ? mainNavButtonPlaceholderImageSrc : '';
    randomId = randomId.toString();

    // Determine the sort at entry-point
    const { sort } = mainNavButtons.find((e) => e.id === insertMainNavButtonsBeforeId);

    const button = {
      id: randomId,
      title: `New Server ${randomId}`,
      imageSrc: addImageSrc,
      channelExtraClassNames: [uiClassNames.blue],
      type: 'link',
      sort,
    };

    // Increment all other sort values after entry point
    const sortedMainNavButtons = mainNavButtons.map((b) => ({
      ...b,
      sort: (b.sort >= sort ? b.sort + 1 : b.sort),
    }));

    this.context.Config.set({ mainNavButtons: [button, ...sortedMainNavButtons] });

    // this.props.history is made available when this component is wrapped by withRouter()
    this.props.history.push(serverLink(button.id));
  }
}

// Use withRouter to make history available to the component
export default withRouter(AddServerButton);
