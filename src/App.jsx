import { useState } from "react";
import Navbar from "./components/Navbar";
import Contacts from "./components/contacts/Contacts";

const App = () => {
  const [loading, ] = useState(false);
  const [getContacts, ] = useState([{}]);

  return (
    <>
      <Navbar />
      <Contacts contacts={getContacts} loading={loading} />
    </>
  );
};

export default App;
