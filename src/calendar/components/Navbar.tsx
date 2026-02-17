import { useAuthStore } from "../../hooks";

interface User {
    name: string;
}

export const Navbar = () => {
    const { startLogout, user } = useAuthStore() as unknown as {
        startLogout: () => void; user: User
    };

    return (
        <div className="navbar navbar-dark bg-dark bg-gradient mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                <span>&nbsp; {user?.name}</span>
            </span>

            <button className="btn btn-outline-info" onClick={startLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>&nbsp; Salir</span>
            </button>
        </div>
    )
}
