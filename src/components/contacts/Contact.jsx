import { CURRENTLINE, CYAN, ORANGE, PURPLE, RED } from "../../helpers/colors";

const Contact = () => {
  return (
    <div className="col-lg-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-sm-4">
              <img
                src="https://avatars.githubusercontent.com/u/93155550?v=4"
                alt=""
                style={{ border: `1px solid ${PURPLE}` }}
                className="img-fluid rounded object-fit-cover "
              />
            </div>
            <div className="col-sm-7">
              <ul className="list-group">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوداگی :{"  "}
                  <span className="fw-bold">
                    ماردین عزت پناه
                  </span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  شماره موبایل :{"  "}
                  <span className="fw-bold">
                    09199367939
                  </span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  آدرس ایمیل :{"  "}
                  <span className="fw-bold">
                    mardin.ep1@gmail.com
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-sm-1 d-flex flex-column align-items-center">
              <button
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-eye" />
              </button>

              <button
                className="btn my-1"
                style={{ backgroundColor: CYAN }}
              >
                <i className="fa fa-pen" />
              </button>
              <button
                className="btn my-1"
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
