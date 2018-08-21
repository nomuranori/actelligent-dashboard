import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import reducers from 'redux/reducers'
import thunk from 'redux-thunk'
import Reactotron from 'reactotron-react-js'

import 'ReactotronConfig'

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-dashboard-pro-react.css?v=1.3.0";

const hist = createBrowserHistory();
if (process.env.NODE_ENV) {
  Reactotron.connect()
  Reactotron.clear()
}
let store = null
if (process.env.NODE_ENV) {
  store = Reactotron.createStore(reducers, {}, applyMiddleware(thunk))
} else {
  store = compose(applyMiddleware(thunk))(createStore)(reducers)
}
const persistor = persistStore(store)
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
      </Router>,
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
