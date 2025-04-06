// require-auth.tsx
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { CONSTANTS } from "@/constants";

export function RequireAuth() {
    const { isLoaded, isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate(CONSTANTS.ROUTES.SIGN_IN.path, { replace: true });
        }
    }, [isLoaded, isSignedIn, navigate]);

    if (!isLoaded) return <div className="text-white">Carregando...</div>;
    if (!isSignedIn) return null;

    return <Outlet />;
}
