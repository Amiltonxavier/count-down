import {
    createBrowserRouter,
} from "react-router";
import LayoutApp from "../pages/layout/_layout";
import HomePage from "../pages/home";
import HistoryPage from "../pages/history";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: LayoutApp,
        children: [
            {
                path: "/",
                Component: HomePage,
                errorElement: <div>error</div>,
            },
            {
                path: "/history",
                Component: HistoryPage,
                errorElement: <div>error</div>,
            }
        ],
        errorElement: <div>error</div>,
    },
]);