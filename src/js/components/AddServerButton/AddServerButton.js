import React from "react";
import { uiClassNames } from "../MainNavItem/MainNavItem";
import { withRouter } from "react-router";
import { serverLink } from "../ServerLink/ServerLink";
import MainNavButton from "../MainNavButton/MainNavButton";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";

class AddServerButton extends MainNavButton {
  static contextType = GlobalContext;

  onClickHandler = () => {
    // New server button template
    const { mainNavButtons, insertMainNavButtonsBeforeId, mainNavButtonPlaceholderImageSrc } = this.context.Config.get([
      'mainNavButtons',
      'insertMainNavButtonsBeforeId',
      'mainNavButtonPlaceholderImageSrc'
    ]);

    // Random number for placeholder IDs and random imageSrc
    let randomId = Math.floor(Math.random() * 10000 );
    const addImageSrc = randomId > 7000 ? mainNavButtonPlaceholderImageSrc : '';
    randomId = randomId.toString();

    // Determine the sort at entry-point
    let { sort } = mainNavButtons.find((e) => e.id === insertMainNavButtonsBeforeId);

    const button = {
        id: randomId,
        title: `New Server ${randomId}`,
        imageSrc: addImageSrc,
        channelExtraClassNames: [ uiClassNames.blue ],
        type: 'link',
        sort: sort,
    };

    // Increment all other sort values after entry point
    mainNavButtons.forEach((b) => {
      if (b.sort >= sort) {
        sort +=1;
        b.sort = sort;
      }
    });

    this.context.Config.set({ mainNavButtons: [ button, ...mainNavButtons ] });

    // this.props.history is made available when this component is wrapped by withRouter()
    this.props.history.push(serverLink(button.id));
  }
}

// Use withRouter to make history available to the component
export default withRouter(AddServerButton);