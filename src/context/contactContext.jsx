/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createContact, deleteContact, getAllContacts, getAllGroups } from "../services/contactService";
import { confirmAlert } from "react-confirm-alert";
import { CURRENTLINE, CYAN, PURPLE, RED } from "../helpers/colors";
import toast from "react-hot-toast";
import { useImmer } from "use-immer";
import _ from "lodash";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createContactForm = async (values) => {
    try {
      setLoading((draft) => !draft);

      const { status, data } = await createContact(values);

      if (status === 201) {
        toast.success("مخاطب با موفقیت ساخته شد", { icon: "🚀" });

        setContacts((draft) => {
          draft.push(data);
        });
        setFilteredContacts((draft) => {
          draft.push(data);
        });
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("مشکلی رخ داده است", { icon: "❌" });
      setLoading((prevLoading) => !prevLoading);
    }
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
      toast.success("مخاطب با موفقیت حذف شد", { icon: "💣" });
      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);
toast.error("مشکلی رخ داده است", { icon: "❌" });
      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  };

  const contactSearch = _.debounce((query) => {
    if (!query) return setFilteredContacts([...contacts]);

    setFilteredContacts((draft) =>
      draft.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, 1000);
return (
  <ContactContext.Provider
    value={{
      loading,
      setLoading,
      setContacts,
      setFilteredContacts,
      contacts,
      filteredContacts,
      groups,
      deleteContact: confirmDelete,
      createContact: createContactForm,
      contactSearch,
    }}
  >
    {children}
  </ContactContext.Provider>)
}


