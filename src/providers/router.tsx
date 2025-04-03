import {
    createBrowserRouter,
} from "react-router";
import LayoutApp from "../pages/layout/_layout";
import { CONSTANTS } from "../constants";

export const router = createBrowserRouter([
    {
        path: CONSTANTS.ROUTES.SIGN_IN.path,
        Component: CONSTANTS.ROUTES.SIGN_IN.Component,
    },
    {
        path: CONSTANTS.ROUTES.HOME.path,
        Component: LayoutApp,
        children: [
            {
                path: CONSTANTS.ROUTES.HOME.path,
                Component: CONSTANTS.ROUTES.HOME.Component,
                errorElement: <div>error</div>,
            },
            {
                path: CONSTANTS.ROUTES.HISTORY.path,
                Component: CONSTANTS.ROUTES.HISTORY.Component,
                errorElement: <div>error</div>,
            },
        ],
        errorElement: <div>error</div>,
    },
]);