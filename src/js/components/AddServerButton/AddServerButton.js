import React from "react";
import MainNavButtons, {uiClassNames} from "../MainNavButtons/MainNavButtons";

class AddServerButton extends MainNavButtons {

  onClickHandler = () => {
    // Random number for placeholder IDs and random imageSrc

    let randomId = Math.floor(Math.random() * 10000 ).toString()
    let addImageSrc = ''
    if (randomId > 5000) {
      addImageSrc = 'url'
    }

    // New server button template

    this.context.addNewServerButton({
      id: randomId,
      title: `New Server ${randomId}`,
      imageSrc: addImageSrc,
      channelExtraClassNames: [uiClassNames.blue ],
    })
  }
}

export default AddServerButton;