import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

ReactDOM.render(
  <GoogleOAuthProvider clientId="883166545175-fqlrhjha7420e36n3g4nogvf7hfe5ln6.apps.googleusercontent.com">
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
