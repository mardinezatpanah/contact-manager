import Navbar from "./components/Navbar";
import Router from "./router";
import { Toaster } from "react-hot-toast";
import { toastOptions } from "./helpers/toastOptions";

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={toastOptions}
      />
      <Navbar />
      <Router />
    </>
  );
};

export default App;
