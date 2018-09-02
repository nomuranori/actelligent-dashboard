import Dashboard from "views/Dashboard/Dashboard.jsx";
import Buttons from "views/Components/Buttons.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Panels from "views/Components/Panels.jsx";
import SweetAlert from "views/Components/SweetAlert.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Icons from "views/Components/Icons.jsx";
import Typography from "views/Components/Typography.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import Wizard from "views/Forms/Wizard.jsx";
import RegularTables from "views/Tables/RegularTables.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import ReactTables from "views/Tables/ReactTables.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Charts from "views/Charts/Charts.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import Widgets from "views/Widgets/Widgets.jsx";
import UserProfile from "views/Pages/UserProfile.jsx";
import TimelinePage from "views/Pages/Timeline.jsx";
import RTLSupport from "views/Pages/RTLSupport.jsx";
import Event from "views/Events/index.jsx";
import EditEvent from "views/Events/edit.jsx";
import RegisteredForEvents from "views/Events/registered.jsx";

import Recording from "views/RecordAndReport/recording";
import IndustryReport from "views/RecordAndReport/industry";
import CompanyReport from "views/RecordAndReport/company";

import ClientRequest from "views/ClientRequest/index.jsx"
import ProposalForRequest from "views/ClientRequest/proposal.jsx"
import ClientReply from "views/ClientRequest/reply.jsx"
import pagesRoutes from "./pages.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Image from "@material-ui/icons/Image";
import Apps from "@material-ui/icons/Apps";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import GridOn from "@material-ui/icons/GridOn";
import Place from "@material-ui/icons/Place";
import WidgetsIcon from "@material-ui/icons/Widgets";
import Timeline from "@material-ui/icons/Timeline";
import DateRange from "@material-ui/icons/DateRange";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsVoice from "@material-ui/icons/SettingsVoice";
import ContactMail from "@material-ui/icons/ContactMail";

// var pages = [
//   {
//     path: "/timeline-page",
//     name: "Timeline Page",
//     mini: "TP",
//     component: TimelinePage
//   },
//   {
//     path: "/user-page",
//     name: "User Profile",
//     mini: "UP",
//     component: UserProfile
//   },
//   {
//     path: "/rtl/rtl-support-page",
//     name: "RTL Support",
//     mini: "RS",
//     component: RTLSupport
//   }
// ].concat(pagesRoutes);

var dashRoutes = [
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     icon: DashboardIcon,
//     component: Dashboard
//   },
//   {
//     collapse: true,
//     path: "-page",
//     name: "Pages",
//     state: "openPages",
//     icon: Image,
//     views: pages
//   },
//   {
//     collapse: true,
//     path: "/components",
//     name: "Components",
//     state: "openComponents",
//     icon: Apps,
//     views: [
//       {
//         path: "/components/buttons",
//         name: "Buttons",
//         mini: "B",
//         component: Buttons
//       },
//       {
//         path: "/components/grid-system",
//         name: "Grid System",
//         mini: "GS",
//         component: GridSystem
//       },
//       {
//         path: "/components/panels",
//         name: "Panels",
//         mini: "P",
//         component: Panels
//       },
//       {
//         path: "/components/sweet-alert",
//         name: "Sweet Alert",
//         mini: "SA",
//         component: SweetAlert
//       },
//       {
//         path: "/components/notifications",
//         name: "Notifications",
//         mini: "N",
//         component: Notifications
//       },
//       { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
//       {
//         path: "/components/typography",
//         name: "Typography",
//         mini: "T",
//         component: Typography
//       }
//     ]
//   },
//   {
//     collapse: true,
//     path: "/forms",
//     name: "Forms",
//     state: "openForms",
//     icon: "content_paste",
//     views: [
//       {
//         path: "/forms/regular-forms",
//         name: "Regular Forms",
//         mini: "RF",
//         component: RegularForms
//       },
//       {
//         path: "/forms/extended-forms",
//         name: "Extended Forms",
//         mini: "EF",
//         component: ExtendedForms
//       },
//       {
//         path: "/forms/validation-forms",
//         name: "Validation Forms",
//         mini: "VF",
//         component: ValidationForms
//       },
//       { path: "/forms/wizard", name: "Wizard", mini: "W", component: Wizard }
//     ]
//   },
//   {
//     collapse: true,
//     path: "/tables",
//     name: "Tables",
//     state: "openTables",
//     icon: GridOn,
//     views: [
//       {
//         path: "/tables/regular-tables",
//         name: "Regular Tables",
//         mini: "RT",
//         component: RegularTables
//       },
//       {
//         path: "/tables/extended-tables",
//         name: "Extended Tables",
//         mini: "ET",
//         component: ExtendedTables
//       },
//       {
//         path: "/tables/react-tables",
//         name: "React Tables",
//         mini: "RT",
//         component: ReactTables
//       }
//     ]
//   },
//   {
//     collapse: true,
//     path: "/maps",
//     name: "Maps",
//     state: "openMaps",
//     icon: Place,
//     views: [
//       {
//         path: "/maps/google-maps",
//         name: "Google Maps",
//         mini: "GM",
//         component: GoogleMaps
//       },
//       {
//         path: "/maps/full-screen-maps",
//         name: "Full Screen Map",
//         mini: "FSM",
//         component: FullScreenMap
//       },
//       {
//         path: "/maps/vector-maps",
//         name: "Vector Map",
//         mini: "VM",
//         component: VectorMap
//       }
//     ]
//   },
// { path: "/widgets", name: "Widgets", icon: WidgetsIcon, component: Widgets },
// { path: "/charts", name: "Charts", icon: Timeline, component: Charts },
// { path: "/calendar", name: "Calendar", icon: DateRange, component: Calendar },
// { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
// { path: "/theme", name: "Broker-Organized Events", icon: WidgetsIcon, component: Calendar },
// { path: "/portfolio", name: "Portfolio", icon: AccountCircle, component: Calendar },
  { path: "/event", name: "Broker-Organized Events", icon: DateRange, component: Event },
  { path: "/event-edit", name: "Edit Event", icon: DateRange, component: EditEvent, hidden: true },
  { path: "/event-registered", name: "Edit Event", icon: DateRange, component: RegisteredForEvents, hidden: true },

  {
    collapse: true,
    path: "/clientrequest",
    name: "Client Requests",
    state: "clientrequest",
    icon: ContactMail,
    views: [
      {
        path: "/clientrequest/index",
        name: "Requests",
        mini: "CR",
        component: ClientRequest
      },
      {
        path: "/clientrequest/proposal",
        name: "Proposals",
        mini: "PR",
        component: ProposalForRequest
      },
      {
        path: "/clientrequest/reply",
        name: "Client Replies",
        mini: "RP",
        component: ClientReply
      },
    ]
  },
  {
    collapse: true,
    path: "/recordingandreport",
    name: "Recordings & Reports",
    state: "recordingandreport",
    icon: SettingsVoice,
    views: [
      {
        path: "/recordingandreport/recording",
        name: "Recordings",
        mini: "RE",
        component: Recording
      },
      {
        path: "/recordingandreport/industryreport",
        name: "Industry Reports",
        mini: "IR",
        component: IndustryReport
      },
      {
        path: "/recordingandreport/companyreport",
        name: "Company Reports",
        mini: "CR",
        component: CompanyReport
      },
    ]
  },
  { redirect: true, path: "/", pathTo: "/event", name: "Dashboard" },
];
export default dashRoutes;
