import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { ClerkProvider } from "@clerk/clerk-react";
import { env } from "../env";
import { CONSTANTS } from "../constants";
import { Toaster } from 'sonner'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryCLient } from "@/lib/tanstack-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export function ProviderApp() {
    return (
        <ClerkProvider
            publishableKey={env.VITE_APP_CLERK_PUBLISHABLE_KEY}
            afterSignOutUrl={CONSTANTS.ROUTES.HOME.path}
        >
            <QueryClientProvider client={queryCLient}>
                <Toaster richColors position="top-left" />
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </QueryClientProvider>
        </ClerkProvider>
    )
}
