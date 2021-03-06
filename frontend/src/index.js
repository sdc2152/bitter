import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import configureStore from "./store/configureStore";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();

// TODO: remove this after testing
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
