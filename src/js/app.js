import React from "react";
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import Chat from "./components/Chat/Chat";
import MainNav from "./components/MainNav/MainNav";
import GroupNav from "./components/GroupNav/GroupNav";
import { GlobalContextProvider } from "./contexts/GlobalContext";

const App = () => (
  <GlobalContextProvider>
    <nav className="nav-side">
      <MainNav />
      <GroupNav />
    </nav>
    <Chat />
  </GlobalContextProvider>
)

ReactDOM.render(<App />, document.getElementById("app"));