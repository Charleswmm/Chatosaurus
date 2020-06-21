import React from "react";
import MainNavButton, {uiClassNames} from "../MainNavButton/MainNavButton";

class AddServerButton extends MainNavButton {

  onClickHandler = () => {
    // Random number for placeholder IDs and random imageSrc
    let randomId = Math.floor(Math.random() * 10000 );
    const addImageSrc = randomId > 7000 ? 'url' : '';
    randomId = randomId.toString();

    // New server button template
    const { mainNavButtons, insertMainNavButtonsBeforeId } = this.context.Config.get(['mainNavButtons', 'insertMainNavButtonsBeforeId']);

    // Determine the sort at entry-point
    let { sort } = mainNavButtons.find((e) => e.id === insertMainNavButtonsBeforeId);

    const button = {
        id: randomId,
        title: `New Server ${randomId}`,
        imageSrc: addImageSrc,
        channelExtraClassNames: [ uiClassNames.blue ],
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

    this.context.setCurrentMainNavButtonId(randomId);
  }
}

export default AddServerButton;