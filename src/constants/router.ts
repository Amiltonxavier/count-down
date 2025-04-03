import { Home, LogIn } from "lucide-react";
import SignIn from "../pages/sign-in";
import HomePage from "../pages/home";
import HistoryPage from "../pages/history";

export const ROUTES = {
  SIGN_IN: {
    path: "/sign-in",
    Component: SignIn,
    icon: LogIn,
  },
  HOME: {
    path: "/",
    Component: HomePage,
    icon: Home,
  },
  HISTORY: {
    path: "/history",
    Component: HistoryPage,
    icon: History,
  },
};
