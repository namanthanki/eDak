import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";

import Register from "./screens/Register";
import Login from "./screens/Login";
import Forgot from "./screens/Forgot";
import Activate from "./screens/Activate";
import Reset from "./screens/Reset";
import Home from "./screens/Home";
import Explore from "./screens/Explore";
import Settings from "./screens/Settings";

import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import "./styles/Components.css";
import ChatProvider from "./context/ChatProvider";

ReactDOM.render(
  <ChatProvider>
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={(props) => <App {...props} />} />
      <Route
        path="/register"
        exact
        render={(props) => <Register {...props} />}
      />
      <Route path="/login" exact render={(props) => <Login {...props} />} />
      <Route
        path="/users/password/forgot"
        exact
        render={(props) => <Forgot {...props} />}
      />
      <Route
        path="/users/activate/:token"
        exact
        render={(props) => <Activate {...props} />}
      />
      <Route
        path="/users/password/reset/:token"
        exact
        render={(props) => <Reset {...props} />}
      />
      <Route path="/app" exact render={(props) => <Home {...props} />} />
      <Route
        path="/app/explore"
        exact
        render={(props) => <Explore {...props} />}
      />
      <Route
        path="/app/settings"
        exact
        render={(props) => <Settings {...props} />}
      />
    </Switch>
  </BrowserRouter>
  </ChatProvider>,
  document.getElementById("root")
);
