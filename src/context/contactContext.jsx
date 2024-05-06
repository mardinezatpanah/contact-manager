/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContact, deleteContact, getAllContacts, getAllGroups } from "../services/contactService";
import { confirmAlert } from "react-confirm-alert";
import { CURRENTLINE, CYAN, PURPLE, RED } from "../helpers/colors";
import toast from "react-hot-toast";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });
  const [contactQuery, setContactQuery] = useState({ text: "" });

  const navigate = useNavigate();

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

  const createContactForm = async (values) => {
    
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(values);

      if (status === 201) {
        const allContacts = [...contacts, data];

        toast.success("مخاطب با موفقیت ساخته شد", { icon: "🚀" });
        setContacts(allContacts);
        setFilteredContacts(allContacts);

        setContact({});
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("مشکلی رخ داده است", { icon: "❌" });
      setLoading((prevLoading) => !prevLoading);
    }
  };

  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const confirmDelete = (contactId, contactName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: PURPLE }}>پاک کردن مخاطب</h1>
            <p style={{ color: "white" }}>
              مطمئنی که میخوای مخاطب <span style={{ color: RED }}>{contactName}</span> رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: CYAN }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    const allContacts = [...contacts];
    try {
      const updatedContact = contacts.filter((c) => c.id !== contactId);
      setContacts(updatedContact);
      setFilteredContacts(updatedContact);

      
      const { status } = await deleteContact(contactId);
      toast.error("مخاطب با موفقیت حذف شد", { icon: "💣" });
      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);

      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  };

  const contactSearch = (event) => {
    setContactQuery({ ...contactQuery, text: event.target.value });
    const allContacts = contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilteredContacts(allContacts);
  };
return (
  <ContactContext.Provider
    value={{
      loading,
      setLoading,
      contact,
      setContacts,
      setFilteredContacts,
      contactQuery,
      contacts,
      filteredContacts,
      groups,
      onContactChange,
      deleteContact: confirmDelete,
      createContact: createContactForm,
      contactSearch,
    }}
  >
    {children}
  </ContactContext.Provider>)
}


