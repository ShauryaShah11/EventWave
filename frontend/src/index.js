// =========================================================
// * Volt React Dashboard
// =========================================================

// * Product Page: https://themesberg.com/product/dashboard/volt-react
// * Copyright 2021 Themesberg (https://www.themesberg.com)
// * Official Repository: https://github.com/themesberg/volt-react-dashboard
// * License: MIT License (https://themesberg.com/licensing)

// * Designed and coded by https://themesberg.com

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import App from "./App";
import ScrollToTop from "./components/common/ScrollToTop";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <HashRouter>
    <ScrollToTop />
    <App />
  </HashRouter>
  </StrictMode>
);