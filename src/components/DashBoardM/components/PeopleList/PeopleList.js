/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as api from "../../../Util/api";
import "./PeopleList.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const PeopleList = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [count, setCount] = React.useState(0);

  const [hours, setHours] = useState({
    staffId: 0,
    email: "",
    name: "",
    newHours: "",
  });

  const [staff, setStaff] = useState({
    staffList: [],
  });

  const [manager, setManager] = useState({
    managerList: [],
  });

  const getManager = async () => {
    const type = "manager";
    try {
      const getAllManagerRes = await api.getAllManagers(type);
      if (getAllManagerRes.status === 200) {
        console.log(getAllManagerRes.data);

        setManager({
          managerList: getAllManagerRes.data,
        });
      }
    } catch (error) {
      if (error.response.status === 404) {
        setManager({
          managerList: [],
        });
      }
    }
  };

  const getStaff = async () => {
    const getAllStaffRes = await api.getAllStaffs();

    if (getAllStaffRes.status === 200) {
      console.log(getAllStaffRes.data);
      setStaff({
        staffList: getAllStaffRes.data,
      });
    } else {
      setStaff({ staffList: [] });
    }
  };

  useEffect(() => {
    getManager(), getStaff();
  }, [count]);

  const { staffList } = staff;
  const { managerList } = manager;

  const handleEdit = (row) => {
    const staffEmail = row.email;
    const currentHours = row.hourLimits;
    const fullName = row.fullName;
    setOpen(true);
    setHours({
      staffId: row.id,
      email: staffEmail,
      name: fullName,
      newHours: currentHours,
    });
    console.log(hours);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    hour: "",
  };

  const handleChange = async ({ hour }) => {
    setOpen(false);
    const id = hours.staffId;
    console.log(id, hour);
    try {
      const changeHoursRes = await api.changeHours({ id, hour });
      if (changeHoursRes.status === 200) {
        console.log("change success");
        setCount(count + 1);
      }
    } catch (error) {}
  };

  return (
    <div className="list">
      <h1 className="title">Manager</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Mobile Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managerList.map((row) => (
              <TableRow key={row.fullName}>
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h1 className="title">Staff</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell align="right">Limit Hours</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Home Address</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffList.map((row) => (
              <TableRow key={row.fullName}>
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="right">{row.hourLimits}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(row)}
                  >
                    Edit Limit Hours
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Change working Hours
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        {hours.name}'s current weekly working time is{" "}
                        {hours.newHours} hours.
                      </DialogContentText>
                      <Formik
                        initialValues={initialValues}
                        onSubmit={handleChange}
                      >
                        <Form>
                          <Field
                            as={TextField}
                            autoFocus
                            margin="dense"
                            id="hour"
                            name="hour"
                            label="Limit Working Hours"
                            fullWidth
                          />
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button type="submit" color="primary">
                              Save Change
                            </Button>
                          </DialogActions>
                        </Form>
                      </Formik>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PeopleList;
