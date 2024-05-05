/* eslint-disable react/prop-types */
import Contact from "./Contact";
import Spinner from "../Spinner";
import { CURRENTLINE, ORANGE, PURPLE } from "../../helpers/colors";
import NotFound from "../../assets/no-found.gif";
import { Link } from "react-router-dom";


const Contacts = ({ contacts, loading }) => {
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
              ? contacts.map((c, i) => <Contact key={i} contact={c} />)
              : (
                <div
                  className="text-center py-5"
                  style={{ backgroundColor: CURRENTLINE }}
                >
                  <p className="h3" style={{ color: ORANGE }}>
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
