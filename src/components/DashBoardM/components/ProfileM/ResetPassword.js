import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as api from "../../../Util/api";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import "./ProfileM.css";

const ResetPassword = ({ onClick, showPasswordForm }) => {
  const history = useHistory();

  const [password, setPassword] = useState({
    oldPassword: "",
    password: "",
  });

  const [passwordWarning, setPasswordWarning] = useState({
    show: false,
    info: "",
  });

  const resetPassword = async ({ oldPassword, password }) => {
    const id = localStorage.getItem("id");
    const type = "MANAGER";
    try {
      const changePasswordRes = await api.ChangePassword({
        id,
        oldPassword,
        password,
        type,
      });

      if (changePasswordRes.status === 200) {
        if (changePasswordRes.data === true) {
          setPasswordWarning({
            show: true,
            info: "Password Change Successfully!",
          });
          history.push("/login");
        } else {
          setPasswordWarning({
            show: true,
            info: "Password Change Failed!",
          });
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        setPasswordWarning({
          show: true,
          info: "Password Change Failed!",
        });
      }
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password Required!"),
    oldPassword: Yup.string().required(),
  });

  return (
    <div className="resetBox">
      <div className="resetPassword">
        <h1 style={{ display: "block" }}>Change Your Password</h1>
        {passwordWarning.show ? (
          <span style={{ color: "red" }}>{passwordWarning.info}</span>
        ) : null}

        <Formik
          initialValues={password}
          onSubmit={resetPassword}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <label
                htmlFor="password"
                style={{ display: "block" }}
                className="itemLabel"
              >
                Old Password
              </label>
              <Field
                label="oldPassword"
                name="oldPassword"
                type="oldPassword"
                id="oldPassword"
                autoFocus
                autoComplete="oldPassword"
              />
              <div>
                <ErrorMessage name="oldPassword">
                  {(msg) => <span className="error">{msg}</span>}
                </ErrorMessage>
              </div>

              <label
                htmlFor="password"
                style={{ display: "block" }}
                className="itemLabel"
              >
                New Password
              </label>
              <Field
                label="password"
                name="password"
                type="password"
                id="password"
                autoFocus
                autoComplete="password"
              />
              <div>
                <ErrorMessage name="password">
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
                  Reset Password
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="cancelResetPasswordButton">
          <Button variant="contained" color="primary" onClick={onclick}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
