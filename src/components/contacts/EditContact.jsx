import { useEffect, useContext } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import mantaking from "../../assets/man-taking-note.png"
import { ContactContext } from "../../context/contactContext";
import { getContact, updateContact } from "../../services/contactService";
import Spinner from "../Spinner";
import { CYAN, ORANGE, PURPLE } from "../../helpers/colors";
import { contactSchema } from "../../validations/contactValidation";
import { useImmer } from "use-immer";

const EditContact = () => {
  const { contactId } = useParams();
  const { setContacts, setFilteredContacts, loading, setLoading, groups } =
    useContext(ContactContext);

  const navigate = useNavigate();

  const [contact, setContact] = useImmer({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);

        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await updateContact(values, contactId);

      if (status === 200) {
        setLoading(false);

        toast.success("مخاطب با موفقیت ویرایش شد", { icon: "✅" });

        setContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === contactId
          );
          draft[contactIndex] = { ...data };
        });
        setFilteredContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === contactId
          );
          draft[contactIndex] = { ...data };
        });

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      toast.error("مشکلی رخ داده است", { icon: "❌" });
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                    initialValues={contact}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      submitForm(values);
                    }}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder="نام و نام خانوادگی"
                        />
                        <ErrorMessage
                          name="name"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="photo"
                          type="text"
                          className="form-control"
                          placeholder="آدرس تصویر"
                        />

                        <ErrorMessage
                          name="photo"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="mobile"
                          type="number"
                          className="form-control"
                          placeholder="شماره موبایل"
                        />

                        <ErrorMessage
                          name="mobile"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="آدرس ایمیل"
                        />

                        <ErrorMessage
                          name="email"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="job"
                          type="text"
                          className="form-control"
                          placeholder="شغل"
                        />

                        <ErrorMessage
                          name="job"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="group"
                          as="select"
                          className="form-control"
                        >
                          <option value="">انتخاب گروه</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </Field>

                        <ErrorMessage
                          name="group"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="mx-2">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: PURPLE }}
                          value="ویرایش مخاطب"
                        />
                        <Link
                          to={"/contacts"}
                          className="btn mx-2"
                          style={{ backgroundColor: CYAN }}
                        >
                          انصراف
                        </Link>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={mantaking}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
