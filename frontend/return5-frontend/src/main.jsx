import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./css/pages.css";
import "./css/App.css";
import "./css/components.css";

import App from "./App.jsx";

import { ThirdwebProvider } from "thirdweb/react";
import { client } from "./api/thirdweb"; // createThirdwebClient is defined here
import { Wrapper } from "./components/appwrapper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThirdwebProvider client={client}>
      <BrowserRouter>
        <Wrapper/>
      </BrowserRouter>
    </ThirdwebProvider>
  </StrictMode>
);
