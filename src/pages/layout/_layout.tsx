import { Outlet } from "react-router";
import { Header } from "../../components/header";


export default function LayoutApp() {
    return (
        <div className="bg-gray-800 max-w-[74rem] m-20 mx-auto p-10 rounded-lg flex flex-col">
            <Header />
            <Outlet />
        </div>
    )
}
