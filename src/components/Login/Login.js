import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import * as api from "../Util/api";
import "./Login.css";

const Login = () => {
  const history = useHistory();

  const [warning, setWarning] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    type: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email Required!"),
    password: Yup.string().required("Password Required!"),
  });

  const onSubmit = async ({ email, password, type }) => {
    localStorage.setItem("email", email);
    try {
      const loginRes = await api.login({ email, password, type });
      if (loginRes.status === 200) {
        console.log(email, password, type);

        localStorage.setItem("id", loginRes.data.id);
        localStorage.setItem("name", loginRes.data.fullName);
        if (type === "Staff") {
          history.push("/dashboards");
        }
        if (type === "Manager") {
          history.push("/dashboardm");
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        setWarning(true);
      }
    }
  };

  return (
    <div className="login_form">
      <h1 style={{ display: "block" }}>Login</h1>
      {warning ? (
        <span style={{ color: "red" }}>
          Email,password or type are not exist
        </span>
      ) : null}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="selection" style={{ display: "block" }}>
              Type
            </label>
            <Field as="select" name="type">
              <option>Select Your Type</option>
              <option value="Staff">Staff</option>
              <option value="Manager">Manager</option>
            </Field>
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
              {(msg) => (
                <span className="error" style={{ display: "block" }}>
                  {msg}
                </span>
              )}
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
              {(msg) => (
                <span className="error" style={{ display: "block" }}>
                  {msg}
                </span>
              )}
            </ErrorMessage>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ display: "block", margin: "auto" }}
            >
              Sign in
            </button>
            <Link
              id="signUpLink"
              className="link"
              to="/signupm"
              style={{ display: "block", margin: "auto" }}
            >
              SignUp
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
