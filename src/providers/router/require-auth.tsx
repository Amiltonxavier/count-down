// require-auth.tsx
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { CONSTANTS } from "@/constants";
import SplashPage from "@/pages/splash";

export function RequireAuth() {
    const { isLoaded, isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate(CONSTANTS.ROUTES.SIGN_IN.path, { replace: true });
        }
    }, [isLoaded, isSignedIn, navigate]);

    if (!isLoaded) return <div className="text-white"><SplashPage /></div>;
    if (!isSignedIn) return null;

    return <Outlet />;
}
