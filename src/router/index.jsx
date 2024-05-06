import { Navigate, Route, Routes } from "react-router-dom";
import Contacts from "../components/contacts/Contacts";
import AddContact from "../components/contacts/AddContact";
import EditContact from "../components/contacts/EditContact";
import ViewContact from "../components/contacts/ViewContact";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contacts" />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/contacts/add" element={<AddContact />} />
      <Route path="/contacts/edit/:contactId" element={<EditContact />} />
      <Route path="/contacts/:contactId" element={<ViewContact />} />
    </Routes>
  );
};

export default Router;
