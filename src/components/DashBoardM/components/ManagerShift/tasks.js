import { green, deepOrange, lightBlue } from "@material-ui/core/colors";
import * as api from "../../../Util/api";

export const tasks = [
  // {
  //   title: "1",
  //   priorityId: 2,
  //   startDate: "2021-05-17T09:30",
  //   endDate: "2021-05-17T10:00",
  // },
  // {
  //   title: "2",
  //   priorityId: 2,
  //   startDate: "2021-05-17T10:30",
  //   endDate: "2021-05-17T12:00",
  // },
  // {
  //   title: "3",
  //   priorityId: 2,
  //   startDate: "2021-05-17T12:15",
  //   endDate: "2021-05-17T13:30",
  // },
  // {
  //   title: "4",
  //   priorityId: 2,
  //   startDate: "2021-05-20T09:30",
  //   endDate: "2021-05-20T11:30",
  // },
  // {
  //   title: "5",
  //   priorityId: 2,
  //   startDate: "2021-05-19T10:30",
  //   endDate: "2021-05-19T12:30",
  // },
  // {
  //   title: "6",
  //   priorityId: 3,
  //   startDate: "2021-05-19T13:00",
  //   endDate: "2021-05-19T14:30",
  // },
  // {
  //   title: "7",
  //   priorityId: 1,
  //   startDate: "2021-05-18T11:00",
  //   endDate: "2021-05-18T11:30",
  // },
  // {
  //   title: "8",
  //   priorityId: 2,
  //   startDate: "2021-05-27T09:30",
  //   endDate: "2021-05-27T11:30",
  //   allDay: true,
  // },
  // {
  //   title: "9",
  //   priorityId: 2,
  //   startDate: "2021-05-27T12:00",
  //   endDate: "2021-05-27T13:00",
  // },
  // {
  //   title: "10",
  //   priorityId: 2,
  //   startDate: "2021-05-27T14:30",
  //   endDate: "2021-05-27T15:30",
  // },
  // {
  //   title: "11",
  //   priorityId: 2,
  //   startDate: "2021-05-23T10:00",
  //   endDate: "2021-05-23T11:00",
  // },
  // {
  //   title: "12",
  //   priorityId: 2,
  //   startDate: "2021-05-23T12:00",
  //   endDate: "2021-05-23T13:35",
  // },
  // {
  //   title: "13",
  //   priorityId: 3,
  //   startDate: "2021-05-23T14:30",
  //   endDate: "2021-05-23T15:45",
  // },
  // {
  //   title: "14",
  //   priorityId: 3,
  //   startDate: "2021-05-24T09:45",
  //   endDate: "2021-05-24T11:15",
  // },
  // {
  //   title: "15",
  //   priorityId: 2,
  //   startDate: "2021-05-24T12:00",
  //   endDate: "2021-05-24T14:00",
  // },
  // {
  //   title: "16",
  //   priorityId: 2,
  //   startDate: "2021-05-24T15:15",
  //   endDate: "2021-05-24T16:30",
  // },
  // {
  //   title: "17",
  //   priorityId: 3,
  //   startDate: "2021-05-25T11:00",
  //   endDate: "2021-05-25T12:00",
  //   allDay: true,
  // },
  // {
  //   title: "18",
  //   priorityId: 1,
  //   startDate: "2021-05-25T11:00",
  //   endDate: "2021-05-25T13:30",
  // },
  // {
  //   title: "19",
  //   priorityId: 1,
  //   startDate: "2021-05-25T14:00",
  //   endDate: "2021-05-25T15:30",
  // },
  // {
  //   title: "20",
  //   priorityId: 3,
  //   startDate: "2021-05-26T10:00",
  //   endDate: "2021-05-26T11:30",
  // },
  // {
  //   title: "21",
  //   priorityId: 2,
  //   startDate: "2021-05-26T14:30",
  //   endDate: "2021-05-26T16:00",
  // },
  // {
  //   title: "22",
  //   priorityId: 1,
  //   startDate: "2021-05-26T16:30",
  //   endDate: "2021-05-26T18:00",
  // },
  // {
  //   title: "23",
  //   priorityId: 3,
  //   startDate: "2021-05-26T12:20",
  //   endDate: "2021-05-26T14:00",
  // },
  // {
  //   title: "24",
  //   priorityId: 1,
  //   startDate: "2021-05-30T12:20",
  //   endDate: "2021-05-30T13:00",
  // },
  // {
  //   title: "25",
  //   priorityId: 3,
  //   startDate: "2021-05-30T13:30",
  //   endDate: "2021-05-30T14:00",
  // },
  // {
  //   title: "26",
  //   priorityId: 3,
  //   startDate: "2021-05-30T09:30",
  //   endDate: "2021-05-30T10:00",
  // },
  // {
  //   title: "27",
  //   priorityId: 2,
  //   startDate: "2021-05-01T12:00",
  //   endDate: "2021-05-01T15:00",
  // },
  // {
  //   title: "28",
  //   priorityId: 2,
  //   startDate: "2021-05-02T09:00",
  //   endDate: "2021-05-02T10:00",
  // },
  // {
  //   title: "29",
  //   priorityId: 2,
  //   startDate: "2021-05-02T10:15",
  //   endDate: "2021-05-02T10:45",
  // },
  // {
  //   title: "30",
  //   priorityId: 2,
  //   startDate: "2021-05-02T10:45",
  //   endDate: "2021-05-02T11:15",
  // },
  // {
  //   title: "31",
  //   priorityId: 1,
  //   startDate: "2021-05-02T12:00",
  //   endDate: "2021-05-02T12:30",
  // },
  // {
  //   title: "32",
  //   priorityId: 1,
  //   startDate: "2021-05-02T13:00",
  //   endDate: "2021-05-02T14:00",
  // },
  // {
  //   title: "33",
  //   priorityId: 2,
  //   startDate: "2021-05-03T10:00",
  //   endDate: "2021-05-03T11:30",
  // },
  // {
  //   title: "34",
  //   priorityId: 2,
  //   startDate: "2021-05-03T11:45",
  //   endDate: "2021-05-03T13:30",
  // },
];

export const priorities = [
  // { id: 1, text: "Low Priority", color: green },
  // { id: 2, text: "Medium Priority", color: lightBlue },
  // { id: 3, text: "High Priority", color: deepOrange },
];

export function ownersList() {
  const staffListResponse = api.getAllStaffs();
  return staffListResponse.data;
}

export const owners = [
  {
    text: "Tianqi Liao",
    id: 124,
  },
  {
    text: "Shuhao Liu",
    id: 125,
  },
  {
    text: "Zelong Wang",
    id: 126,
  },
  {
    text: "YUN-TUNG SHIH",
    id: 127,
  },
  {
    text: "Jiahao Ai",
    id: 128,
  },
  {
    text: "Jiahao Xu",
    id: 128,
  },
];
