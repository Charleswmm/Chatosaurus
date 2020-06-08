import React from "react";
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import Chat from "./components/Chat/Chat";
import ServerNav from "./components/ServerNav/ServerNav";
import GroupNav from "./components/GroupNav/GroupNav";
import { ContextProvider } from "./contexts/context";

const App = () => (
  <ContextProvider>
    <nav className="nav-side">
      <ServerNav />
      <GroupNav />
    </nav>
    <Chat />
  </ContextProvider>
)

ReactDOM.render(<App />, document.getElementById("app"));