import { withRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import MainNavButton from '../MainNavButton/MainNavButton';
import { uiClassNames } from '../MainNavItem/MainNavItem';

class AddServerButton extends MainNavButton {
  static contextType = GlobalContext;

  onClickHandler = () => {
    const { Config, joinRoutePath } = this.context;

    // New server button template
    const config = Config.get([
      'mainNavButtons',
      'insertMainNavButtonsBeforeId',
    ]);

    const {
      mainNavButtons,
      insertMainNavButtonsBeforeId,
    } = config;

    // Random number for placeholder IDs and random imageSrc
    let randomId = Math.floor(Math.random() * 10000);
    randomId = randomId.toString();

    // Determine the sort at entry-point
    const { sort } = mainNavButtons.find((e) => e.id === insertMainNavButtonsBeforeId);

    const button = {
      id: randomId,
      name: `New Server ${randomId}`,
      channelExtraClassNames: [uiClassNames.blue],
      type: 'link',
      sort,
    };

    // Increment all other sort values after entry point
    const sortedMainNavButtons = mainNavButtons.map((b) => ({
      ...b,
      sort: (b.sort >= sort ? b.sort + 1 : b.sort),
    }));

    this.context.Config.set({
      mainNavButtons: [button, ...sortedMainNavButtons],
    });

    // this.props.history is made available when this component is wrapped by withRouter()
    this.props.history.push({
      pathname: joinRoutePath([button.id]),
      state: {
        loading: false,
      },
    });
  }
}

// Use withRouter to make history available to the component
export default withRouter(AddServerButton);
