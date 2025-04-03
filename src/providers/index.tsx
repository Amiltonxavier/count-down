import { RouterProvider } from "react-router";
import { router } from "./router";
import { HistoryContextProvider } from "../context/history-context";


export function ProviderApp() {
    return (
        <HistoryContextProvider>
            <RouterProvider router={router} />
        </HistoryContextProvider>
    )
}
