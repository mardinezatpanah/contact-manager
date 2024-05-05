/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { CURRENTLINE, CYAN, ORANGE, PURPLE, RED } from "../../helpers/colors";

const Contact = ({ contact, confirmDelete }) => {
  return (
    <div className="col-lg-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-sm-4">
              <img
                src={contact.photo}
                alt={contact.name}
                style={{ border: `1px solid ${PURPLE}`, width: "100%" }}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-sm-7">
              <ul className="list-group px-0  my-3 my-sm-0" >
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوداگی :{"  "}
                  <span className="fw-bold">{contact.name}</span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  شماره موبایل :{"  "}
                  <span className="fw-bold">{contact.mobile}</span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  آدرس ایمیل :{"  "}
                  <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-sm-1 px-3 d-flex flex-column align-items-center">
              <Link
                to={`/contacts/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-eye" />
              </Link>

              <Link
                to={`/contacts/edit/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: CYAN }}
              >
                <i className="fa fa-pen" />
              </Link>
              <button
                className="btn my-1"
                onClick={confirmDelete}
                style={{ backgroundColor: RED }}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
