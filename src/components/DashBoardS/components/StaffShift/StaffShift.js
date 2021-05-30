import * as React from "react";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import {
  darken,
  fade,
  lighten,
} from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import classNames from "clsx";
import {
  Scheduler,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
// import WbSunny from "@material-ui/icons/WbSunny";
// import FilterDrama from "@material-ui/icons/FilterDrama";
// import Opacity from "@material-ui/icons/Opacity";
// import ColorLens from "@material-ui/icons/ColorLens";
import { withStyles } from "@material-ui/core/styles";
// import { owners } from "./tasks";
import * as api from "../../../Util/api";

// Start Style
const styles = (theme) => ({
  cell: {
    color: "#78909C!important",
    position: "relative",
    userSelect: "none",
    verticalAlign: "top",
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    "&:first-child": {
      borderLeft: "none",
    },
    "&:last-child": {
      paddingRight: 0,
    },
    "tr:last-child &": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.primary.main, 0.14),
      outline: 0,
    },
  },
  content: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
  },
  text: {
    padding: "0.4em",
    textAlign: "center",
  },
  sun: {
    color: "#FFEE48",
  },
  cloud: {
    color: "#90A4AE",
  },
  rain: {
    color: "#4FC3F7",
  },
  sunBack: {
    backgroundColor: "#FFFDE7",
  },
  cloudBack: {
    backgroundColor: "#ECEFF1",
  },
  rainBack: {
    backgroundColor: "#E1F4FE",
  },
  opacity: {
    opacity: "0.4",
  },
  appointment: {
    borderRadius: "10px",
    "&:hover": {
      opacity: 0.4,
    },
  },
  apptContent: {
    "&>div>div": {
      whiteSpace: "normal !important",
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: "none",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    width: "400px",
  },
  tooltipText: {
    ...theme.typography.body2,
    display: "inline-block",
  },
  title: {
    ...theme.typography.h4,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: "middle",
  },
  circle: {
    width: theme.spacing(4.4),
    height: theme.spacing(4.4),
    verticalAlign: "super",
  },
  textCenter: {
    textAlign: "center",
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.4),
  },
});

const WeatherIcon = ({ classes, id }) => {
  switch (id) {
    case 0:
      return null;
    // return <Opacity className={classes.rain} fontSize="large" />;
    case 1:
      return null;
    // return <WbSunny className={classes.sun} fontSize="large" />;
    case 2:
      return null;
    // return <FilterDrama className={classes.cloud} fontSize="large" />;
    default:
      return null;
  }
};

// use axios in here to acquire these data
const appointments = [
  // {
  //   id: 0,
  //   title: "Tianqi Liao",
  //   startDate: new Date(2021, 4, 10, 8, 0),
  //   endDate: new Date(2021, 4, 10, 12, 0),
  //   ownerId: 1,
  // },
  // {
  //   id: 2,
  //   title: "Tianqi Liao",
  //   startDate: new Date(2021, 4, 13, 8, 0),
  //   endDate: new Date(2021, 4, 13, 12, 0),
  //   ownerId: 1,
  // },
  // {
  //   id: 7,
  //   title: "8",
  //   startDate: new Date(2021, 4, 3, 11, 0),
  //   endDate: new Date(2021, 4, 3, 12, 0),
  //   rRule: "FREQ=WEEKLY;BYDAY=TU;UNTIL=20210801",
  //   exDate: "20210710T080000Z,20210724T080000Z",
  //   ownerId: 3,
  // },
];

const name = localStorage.getItem("name");

const ownerId = localStorage.getItem("id");

const owners = [
  {
    text: name,
    id: ownerId,
  },
];

const resources = [
  {
    fieldName: "ownerId",
    title: "Owners",
    instances: owners,
  },
];

const getBorder = (theme) =>
  `1px solid ${
    theme.palette.type === "light"
      ? lighten(fade(theme.palette.divider, 1), 0.88)
      : darken(fade(theme.palette.divider, 1), 0.48)
  }`;

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold" }}
  />
);

// #FOLD_BLOCK
const CellBase = React.memo(
  ({
    classes,
    startDate,
    formatDate,
    otherMonth,
    // #FOLD_BLOCK
  }) => {
    const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: "numeric", month: "long" }
      : { day: "numeric" };
    return (
      <TableCell
        tabIndex={0}
        className={classNames({
          [classes.cell]: true,
          [classes.rainBack]: iconId === 0,
          [classes.sunBack]: iconId === 1,
          [classes.cloudBack]: iconId === 2,
          [classes.opacity]: otherMonth,
        })}
      >
        <div className={classes.content}>
          {/* <WeatherIcon classes={classes} id={iconId} /> */}
        </div>
        <div className={classes.text}>
          {formatDate(startDate, formatOptions)}
        </div>
      </TableCell>
    );
  }
);

const TimeTableCell = withStyles(styles, { name: "Cell" })(CellBase);

const Appointment = withStyles(styles, { name: "Appointment" })(
  ({ classes, ...restProps }) => (
    <Appointments.Appointment {...restProps} className={classes.appointment} />
  )
);

const AppointmentContent = withStyles(styles, { name: "AppointmentContent" })(
  ({ classes, ...restProps }) => (
    <Appointments.AppointmentContent
      {...restProps}
      className={classes.apptContent}
    />
  )
);

// right corner LOGO and Company Name
const FlexibleSpace = withStyles(styles, { name: "ToolbarRoot" })(
  ({ classes, ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
      <div className={classes.flexContainer}>
        {/* <ColorLens fontSize="large" htmlColor="#FF7043" /> logo*/}
        <Typography variant="h4" style={{ marginLeft: "10px" }}>
          SEPM-MC3-1
        </Typography>
      </div>
    </Toolbar.FlexibleSpace>
  )
);

class StaffShift extends React.PureComponent {
  // #FOLD_BLOCK
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  // put axios in here
  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        console.log(data, "add");
        const id = data[0].id;
        const title = data[0].title;
        const startDate = data[0].startDate.getTime();
        const endDate = data[0].endDate.getTime();
        const ownerId = data[0].ownerId;
        console.log(id, title, startDate, endDate, ownerId, "add");

        try {
          const availableTimeResponse = api.setAvailableTime({
            ownerId,
            endDate,
            startDate,
          });
          if (availableTimeResponse.status === 200) {
            alert("set time successful!");
          }
        } catch (error) {
          if (error.response.status === 400) {
            alert("set time fail!");
          }
        }
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
        console.log(data, "change");
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
        console.log(data, "deleted");
      }
      return { data };
    });
  }
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////

  render() {
    const { data } = this.state;

    return (
      <Paper>
        <Scheduler data={data}>
          <EditingState onCommitChanges={this.commitChanges} />
          <ViewState defaultCurrentDate={Date()} />
          <WeekView startDayHour={8} endDayHour={18} />
          <MonthView
            // timeTableCellComponent={TimeTableCell} display color for every day
            dayScaleCellComponent={DayScaleCell}
          />

          <Appointments
            appointmentComponent={Appointment} //css style
            appointmentContentComponent={AppointmentContent}
          />
          <Resources data={resources} />

          <Toolbar flexibleSpaceComponent={FlexibleSpace} />
          <ViewSwitcher />
          <DateNavigator />

          <EditRecurrenceMenu />
          <AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
          <AppointmentForm />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}

export default StaffShift;
