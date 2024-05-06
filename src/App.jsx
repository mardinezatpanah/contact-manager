import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Router from "./router";

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#ffff',
          },
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
      <Navbar />
      <Router />
    </>
  );
};

export default App;
