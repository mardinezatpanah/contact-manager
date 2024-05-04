import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Contacts from "./components/contacts/Contacts";
import { Navigate, Route, Routes } from "react-router-dom";
import { getAllContacts } from "./services/contactService";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [getContacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();

        setContacts(contactsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={<Contacts contacts={getContacts} loading={loading} />}
        />
      </Routes>
    </>
  );
};

export default App;
