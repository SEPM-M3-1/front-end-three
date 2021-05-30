import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SignUpS from "../SignUpS";
import ProfileM from "./components/ProfileM/ProfileM";
import PeopleList from "./components/PeopleList";
import ManagerShift from "./components/ManagerShift";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Shift Management" {...a11yProps(0)} />
          <Tab label="People List" {...a11yProps(1)} />
          <Tab label="Personal Profile" {...a11yProps(2)} />
          <Tab label="SignUp For Staff" {...a11yProps(3)} />
          <Tab label="Logout" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{ width: "1200px", margin: "0 auto", height: "80vh" }}>
          <h1>Staff Available Shift</h1>
          <ManagerShift />
          <h1>Shift Table</h1>
          <ManagerShift />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PeopleList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfileM />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SignUpS />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Link to="/login">
          <Button variant="contained" color="primary">
            Logout
          </Button>
        </Link>
      </TabPanel>
    </div>
  );
}
