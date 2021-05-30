import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProfileS from "./components/ProfileS/ProfileS";
import NotificationS from "./components/NotificationS";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
// import ShiftTable from "./components/ShiftTable/ShiftTable";
// import Calendar from "./components/ShiftTable/Calendar";
import StaffShift from "./components/StaffShift";

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
          <Tab label="Shift Calendar" {...a11yProps(0)} />
          <Tab label="Personal Profile" {...a11yProps(1)} />
          <Tab label="Notification" {...a11yProps(2)} />
          <Tab label="Logout" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{ width: "1200px", margin: "0 auto", height: "80vh" }}>
        <StaffShift />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfileS />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NotificationS />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Link to="/login">
          <Button variant="contained" color="primary">
            Logout
          </Button>
        </Link>
      </TabPanel>
    </div>
  );
}
