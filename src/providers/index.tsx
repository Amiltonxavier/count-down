import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { ClerkProvider } from "@clerk/clerk-react";
import { env } from "../env";
import { CONSTANTS } from "../constants";
import { Toaster } from 'sonner'
import { CountDownContextProvider } from "@/context/count-down-context";
import { CyclesContextProvider } from "@/context/cycles-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryCLient } from "@/lib/tanstack-query";
import { CountUpProvider } from "@/context/count-up-context";
import { CountTypeProvider } from "@/context/type-count-context";


export function ProviderApp() {
    return (
        <ClerkProvider
            publishableKey={env.VITE_APP_CLERK_PUBLISHABLE_KEY}
            afterSignOutUrl={CONSTANTS.ROUTES.HOME.path}
        >
            <QueryClientProvider client={queryCLient}>
                <CountTypeProvider>
                    <CyclesContextProvider>
                        <CountUpProvider>
                            <CountDownContextProvider>
                                <Toaster richColors position="top-left" />
                                <RouterProvider router={router} />
                            </CountDownContextProvider>
                        </CountUpProvider>
                    </CyclesContextProvider>
                </CountTypeProvider>
            </QueryClientProvider>
        </ClerkProvider>
    )
}
