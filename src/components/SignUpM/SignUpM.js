import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import * as api from "../Util/api";

const SignUpM = () => {
  const history = useHistory();

  const [warning, setWarning] = useState(false);

  const initialValues = {
    email: "",
    fullName: "",
    password: "",
    mobile: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email Required!"),
    fullName: Yup.string().required("FullName Required!"),
    password: Yup.string()
      .required("Password Required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    phone: Yup.string().required("Mobile Required!"),
  });

  const onSubmit = async ({ email, fullName, password, phone }) => {
    console.log(email, fullName, password, phone);
    try {
      const signupRes = await api.sigunm({ email, fullName, password, phone });
      if (signupRes.status === 200) {
        history.push("/login");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setWarning(true);
      }
    }
  };

  return (
    <div className="signup_form">
      <h1 style={{ display: "block" }}>Manager SignUp</h1>
      {warning ? (
        <span style={{ color: "red" }}>Email already exist</span>
      ) : null}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email" style={{ display: "block" }}>
              Email
            </label>
            <Field
              label="Email"
              name="email"
              id="email"
              autoFocus
              autoComplete="email"
            />
            <ErrorMessage name="email">
              {(msg) => <span className="error">{msg}</span>}
            </ErrorMessage>
            <label htmlFor="full-name" style={{ display: "block" }}>
              Full Name
            </label>
            <Field
              label="Full-Name"
              name="fullName"
              id="fullName"
              autoFocus
              autoComplete="fullName"
            />
            <ErrorMessage name="fullName">
              {(msg) => <span className="error">{msg}</span>}
            </ErrorMessage>
            <label htmlFor="password" style={{ display: "block" }}>
              Password
            </label>
            <Field
              label="Password"
              id="password"
              type="password"
              name="password"
              autoComplete="password"
            />
            <ErrorMessage name="password">
              {(msg) => <span className="error">{msg}</span>}
            </ErrorMessage>
            <label htmlFor="mobile" style={{ display: "block" }}>
              Mobile Number
            </label>
            <Field
              label="mobile number"
              id="phone"
              type="phone"
              name="phone"
              autoComplete="phone"
            />
            <ErrorMessage name="phone">
              {(msg) => <span className="error">{msg}</span>}
            </ErrorMessage>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ display: "block" }}
            >
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <Link id="signUpLink" className="link" to="/login">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpM;
