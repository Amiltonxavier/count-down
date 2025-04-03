import { Outlet } from "react-router";
import { Header } from "../../components/header";
import { useAuth } from "@clerk/clerk-react";

export default function LayoutApp() {
    //const router = use
    const { isSignedIn } = useAuth(); // Retorna true se o usuário estiver autenticado
    //const { user } = useUser(); // Dados do usuário autenticado

    if (!isSignedIn) {
        return
    }

    return (
        <div className="bg-gray-800 max-w-[74rem] m-20 mx-auto p-10 rounded-lg flex flex-col">
            <Header />
            <Outlet />
        </div>
    )
}
