import PricingPage from "views/Pages/PricingPage.jsx";
import LockScreenPage from "views/Pages/LockScreenPage.jsx";

// @material-ui/icons
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import LockOpen from "@material-ui/icons/LockOpen";

const pagesRoutes = [
  {
    path: "/pages/pricing-page",
    name: "Pricing Page",
    short: "Pricing",
    mini: "PP",
    icon: MonetizationOn,
    component: PricingPage
  },
  {
    path: "/pages/lock-screen-page",
    name: "Lock Screen Page",
    short: "Lock",
    mini: "LSP",
    icon: LockOpen,
    component: LockScreenPage
  },
  {
    redirect: true,
    path: "/pages",
    pathTo: "/pages/register-page",
    name: "Register Page"
  }
];

export default pagesRoutes;
