import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.scss";
import { persistor, store } from "./store/configureStore";
import Root from "./components/Root";
import KRuoka from "./pages/KRuoka";
import { Notification } from "./components/common/Notification";
import MyKRukoa from "./pages/KRuoka/pages/MyKRuoka";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" component={Root} />
            <Route exact path="/kruoka" component={KRuoka} />
            <Route exact path="/kruoka/my" component={MyKRukoa} />
          </Switch>
          <Notification />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
