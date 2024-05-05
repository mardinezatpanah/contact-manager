import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Contacts from "./components/contacts/Contacts";
import { Navigate, Route, Routes } from "react-router-dom";
import { getAllContacts, getAllGroups } from "./services/contactService";
import AddContact from "./components/contacts/AddContact";
import ViewContact from "./components/contacts/ViewContact";
import EditContact from "./components/contacts/EditContact";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    name: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });
  const [forceRender, setForceRender] = useState(false);
  const [query, setQuery] = useState({ text: "" });
  const [getFilteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
  }, [forceRender]);

  const contactSearch = (event) => {
    setQuery({ ...query, text: event.target.value });
    const allContacts = getContacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
      setFilteredContacts(allContacts);
  };

  return (
    <>
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contacts
              contacts={getFilteredContacts}
              loading={loading}
              setLoading={setLoading}
              setContacts={setContacts}
            />
          }
        />
        <Route
          path="/contacts/add"
          element={
            <AddContact
              loading={loading}
              contact={getContact}
              groups={getGroups}
              getContact={getContact}
              setContact={setContact}
              forceRender={forceRender}
              setForceRender={setForceRender}
            />
          }
        />
        <Route
          path="/contacts/edit/:contactId"
          element={
            <EditContact
              forceRender={forceRender}
              setForceRender={setForceRender}
            />
          }
        />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
      </Routes>
    </>
  );
};

export default App;
