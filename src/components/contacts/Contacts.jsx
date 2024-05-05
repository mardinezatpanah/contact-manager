/* eslint-disable react/prop-types */
import Contact from "./Contact";
import Spinner from "../Spinner";
import { CURRENTLINE, PURPLE, RED, CYAN } from "../../helpers/colors";
import NotFound from "../../assets/no-found.gif";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { deleteContact, getAllContacts } from "../../services/contactService";


const Contacts = ({ contacts, loading, setLoading, setContacts }) => {
  const confirm = (contactId, contactName) => {
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
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col mt-2">
              <p className="h3">
              <Link
                  to={"/contacts/add"}
                  className="btn m-2"
                  style={{ backgroundColor: PURPLE }}
                >
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? <Spinner /> : (
        <section className="container">
          <div className="row">
            {contacts.length > 0
              ? contacts.map((c) => <Contact key={c.id} confirmDelete={() => confirm(c.id, c.name)} contact={c} />)
              : (
                <div
                  className="text-center py-5"
                  style={{ backgroundColor: CURRENTLINE }}
                >
                  <p className="h3" style={{ color: RED }}>
                    مخاطب یافت نشد ...
                  </p>
                  <img
                    src={NotFound}
                    alt="پیدا نشد"
                    className="w-25"
                  />
                </div>
              )}
          </div>
        </section>
      )}
    </>
  );
};

export default Contacts;
