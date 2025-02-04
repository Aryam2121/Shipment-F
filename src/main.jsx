import React from "react";
import { createRoot } from "react-dom/client"; // ✅ Correct import
import { Provider } from "react-redux";
import store from "./redux/store"; // ✅ Import Redux store
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")); // ✅ Correct usage

root.render(
  <Provider store={store}>  {/* ✅ Wrap App in Provider */}
    <App />
  </Provider>
);
