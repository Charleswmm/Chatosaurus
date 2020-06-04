import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import SideNav from "./components/SideNav/SideNav";
import Chat from "./components/Chat/Chat";

const App = () => (
  <div className="app">
    <SideNav />
    <Chat />
  </div>
)

ReactDOM.render(<App />, document.getElementById("root"));