import { RouterProvider } from "react-router";
import { router } from "./router";
import { HistoryContextProvider } from "../context/history-context";
import { ClerkProvider } from "@clerk/clerk-react";
import { env } from "../env";
import { CONSTANTS } from "../constants";


export function ProviderApp() {
    return (
        <ClerkProvider publishableKey={env.VITE_APP_CLERK_PUBLISHABLE_KEY} afterSignOutUrl={CONSTANTS.ROUTES.HOME.path}>
            <HistoryContextProvider>
                <RouterProvider router={router} />
            </HistoryContextProvider>
        </ClerkProvider>
    )
}
