import React from "react";
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import Chat from "./components/Chat/Chat";
import ServerNav from "./components/ServerNav/ServerNav";
import GroupNav from "./components/GroupNav/GroupNav";
import { GlobalContextProvider } from "./contexts/context";

const App = () => (
  <GlobalContextProvider>
    <nav className="nav-side">
      <ServerNav />
      <GroupNav />
    </nav>
    <Chat />
  </GlobalContextProvider>
)

ReactDOM.render(<App />, document.getElementById("app"));