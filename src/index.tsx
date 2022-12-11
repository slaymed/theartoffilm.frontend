import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";

import "./index.css";
import "./resets.css";

import App from "./App";

import store from "./store";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);
