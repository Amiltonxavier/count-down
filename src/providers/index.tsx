import { RouterProvider } from "react-router";
import { router } from "./router";


export function ProviderApp() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}
