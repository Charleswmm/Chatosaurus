import React from "react";
import ReactDOM from 'react-dom';
import '../scss/app.scss';
import Chat from "./components/Chat/Chat";
import MainNavButton from "./components/MainNavButton/MainNavButton";
import GroupNav from "./components/GroupNav/GroupNav";
import { GlobalContextProvider } from "./contexts/GlobalContext";

const App = () => (
  <GlobalContextProvider>
    <nav className="nav-side">
      <MainNavButton />
      <GroupNav />
    </nav>
    <Chat />
  </GlobalContextProvider>
)

ReactDOM.render(<App />, document.getElementById("app"));