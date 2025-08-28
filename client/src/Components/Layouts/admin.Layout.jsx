import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { FaServicestack } from "react-icons/fa6";
import { useAuth } from "../../store/auth";




export const AdminLayout = () => {
    const { user, isLoading } = useAuth();

    if (isLoading || !user) return <Navigate to="/login" />;

    if (!user.isAdmin) {
        return (
            <div className="unauthorized">
                <p>You are not authorized to view this page.</p>
            </div>
        );
    }



    return <>
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/admin/users"><FaUser /> Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/contacts"><IoMdContact /> Contacts</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/services"><FaServicestack />  Services</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet />
    </>
}
