import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BrowserRouter } from "react-router-dom";
import { ContactProvider } from "./context/contactContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContactProvider>
      <App />
    </ContactProvider>
  </BrowserRouter>
);
