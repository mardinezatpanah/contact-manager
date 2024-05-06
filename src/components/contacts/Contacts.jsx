/* eslint-disable react/prop-types */
import Contact from "./Contact";
import Spinner from "../Spinner";
import { CURRENTLINE, PURPLE, RED } from "../../helpers/colors";
import NotFound from "../../assets/no-found.gif";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";


const Contacts = () => {
  const { filteredContacts, loading, deleteContact } =
    useContext(ContactContext);

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
            {filteredContacts.length > 0
              ? filteredContacts.map((c) => <Contact key={c.id} deleteContact={() => deleteContact(c.id, c.name)} contact={c} />)
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
