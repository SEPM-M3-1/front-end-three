import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as api from "../../../Util/api";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import "./ProfileS.css";
import ResetPasswordS from "./ResetPasswords";

const ProfileS = () => {
  const history = useHistory();

  const [sProfile, setSProfile] = useState({
    fullName: " ",
    phone: " ",
    hourLimits: " ",
    address: " ",
    preferredName: "",
    email: " ",
    address: " ",
  });

  const [warning, setWarning] = useState({
    show: false,
    info: "",
  });
  const [passwordWarning, setPasswordWarning] = useState({
    show: false,
    info: "",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    getSprofile();
  }, []);

  const getSprofile = async () => {
    const email = localStorage.getItem("email");
    try {
      const getSprofileResponse = await api.fetchStaffProfileByEmail({
        email,
      });
      if (getSprofileResponse.status === 200) {
        setSProfile({
          fullName: getSprofileResponse.data.fullName,
          phone: getSprofileResponse.data.phone,
          email: getSprofileResponse.data.email,
          hourLimits: getSprofileResponse.data.hourLimits,
          address: getSprofileResponse.data.address,
          preferredName: getSprofileResponse.data.preferredName,
        });
      }
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

  const onSubmit = async ({
    fullName,
    phone,
    email,
    hourLimits,
    address,
    preferredName,
  }) => {
    console.log(fullName, phone, email);
    const id = localStorage.getItem("id");
    try {
      const sProfileResponse = await api.changeStaffProfile({
        id,
        fullName,
        phone,
        email,
        hourLimits,
        address,
        preferredName,
      });
      if (sProfileResponse.status === 200) {
        setSProfile({
          fullName: sProfileResponse.data.fullName,
          phone: sProfileResponse.data.phone,
          email: sProfileResponse.data.email,
          hourLimits: sProfileResponse.data.hourLimits,
          address: sProfileResponse.data.address,
          preferredName: sProfileResponse.data.preferredName,
          address: sProfileResponse.data.address,
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
          initialValues={sProfile}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
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
                htmlFor="hourLimits"
                style={{ display: "block" }}
                className="itemLabel"
              >
                Working hours limit
              </label>
              <Field
                disabled="true"
                label="hourLimits"
                name="hourLimits"
                id="hourLimits"
                autoFocus
                autoComplete="hourLimits"
              />
              <ErrorMessage name="hourLimits">
                {(msg) => <span className="error">{msg}</span>}
              </ErrorMessage>

              <label
                htmlFor="preferredName"
                style={{ display: "block" }}
                className="itemLabel"
              >
                Preferred Name
              </label>
              <Field
                label="preferredName"
                name="preferredName"
                id="preferredName"
                autoFocus
                autoComplete="preferredName"
              />
              <ErrorMessage name="preferredName">
                {(msg) => <span className="error">{msg}</span>}
              </ErrorMessage>

              <label
                htmlFor="address"
                style={{ display: "block" }}
                className="itemLabel"
              >
                Home Address
              </label>
              <Field
                label="address"
                name="address"
                id="address"
                autoFocus
                autoComplete="address"
              />
              <ErrorMessage name="address">
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
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Comfirm Change
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {!showPasswordForm ? (
        <div className="resetPasswordButton">
          <Button variant="contained" color="primary" onClick={onclick}>
            Reset Password
          </Button>
        </div>
      ) : null}

      {showPasswordForm ? <ResetPasswordS /> : null}
    </div>
  );
};

export default ProfileS;
