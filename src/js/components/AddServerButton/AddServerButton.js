import React from "react";
import ServerButton from "../ServerButton/ServerButton";

class AddServerButton extends ServerButton {

  onClickHandler() {
    alert('Open a fucking modal bro!!!');
    super.onClickHandler()
  }
}

export default AddServerButton;