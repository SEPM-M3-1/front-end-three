import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as api from "../../../Util/api";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import "./ProfileM.css";
import ResetPassword from "./ResetPassword";

const ProfileM = () => {
  const [mProfile, setMProfile] = useState({
    fullName: " ",
    phone: " ",
    email: "",
  });

  const [warning, setWarning] = useState({
    show: false,
    info: "",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    getMprofile();
  }, []);

  const getMprofile = async () => {
    const email = localStorage.getItem("email");
    try {
      const getMprofileResponse = await api.fetchManagerProfileByEmail({
        email,
      });
      if (getMprofileResponse.status === 200) {
        setMProfile({
          fullName: getMprofileResponse.data.fullName,
          phone: getMprofileResponse.data.phone,
          email: getMprofileResponse.data.email,
        });
        console.log(getMprofileResponse.data);
      }
      console.log(mProfile);
    } catch (error) {
      setWarning({
        show: true,
        info: "Get the Init Data Failed!",
      });
    }
  };

  const onclick = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  const handleSubmit = async ({ fullName, phone, email }) => {
    const id = localStorage.getItem("id");

    console.log(fullName, phone, email, id);
    try {
      const mprofileResponse = await api.changeManagerProfile({
        id,
        fullName,
        phone,
        email,
      });
      if (mprofileResponse.status === 200) {
        setMProfile({
          fullName: mprofileResponse.data.fullName,
          phoneNum: mprofileResponse.data.phoneNum,
          email: mprofileResponse.data.email,
        });
        setWarning({
          show: true,
          info: "Change Profile Successfully!",
        });
      }
    } catch (error) {
      setWarning({
        show: true,
        info: "Change Profile Failed",
      });
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email Required!"),
  });

  return (
    <div>
      <div className="profileBox">
        <h1 style={{ display: "block" }}>Your Profiles</h1>
        {warning.show ? (
          <span style={{ color: "red" }}>{warning.info}</span>
        ) : null}
        <Formik
          enableReinitialize
          initialValues={mProfile}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {/* {({ isSubmitting }) => ( */}
          <Form>
            <label
              htmlFor="fullName"
              style={{ display: "block" }}
              className="itemLabel"
            >
              Full Name
            </label>
            <Field
              label="fullName"
              name="fullName"
              id="fullName"
              autoFocus
              autoComplete="fullName"
            />
            <ErrorMessage name="fullName">
              {(msg) => <span className="error">{msg}</span>}
            </ErrorMessage>

            <label
              htmlFor="email"
              style={{ display: "block" }}
              className="itemLabel"
            >
              Email
            </label>
            <Field
              label="email"
              id="email"
              type="email"
              name="email"
              autoComplete="email"
            />
            <div>
              <ErrorMessage name="email">
                {(msg) => <span className="error">{msg}</span>}
              </ErrorMessage>
            </div>

            <label
              htmlFor="phone"
              style={{ display: "block" }}
              className="itemLabel"
            >
              Phone Number
            </label>
            <Field
              label="phone"
              id="phone"
              type="phone"
              name="phone"
              autoComplete="phone"
            />
            <div>
              <ErrorMessage name="phone">
                {(msg) => <span className="error">{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="itemLabel">
              <Button variant="contained" color="primary" type="submit">
                Comfirm Change
              </Button>
            </div>
          </Form>
          {/* )} */}
        </Formik>
      </div>

      {!showPasswordForm ? (
        <div className="resetPasswordButton">
          <Button variant="contained" color="primary" onClick={onclick}>
            Reset Password
          </Button>
        </div>
      ) : null}

      {showPasswordForm ? (
        <ResetPassword onClick={onclick} showPasswordForm={showPasswordForm} />
      ) : null}
    </div>
  );
};

export default ProfileM;
