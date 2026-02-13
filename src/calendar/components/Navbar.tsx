
export const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark bg-gradient mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                <span>&nbsp; Juan</span>
            </span>

            <button className="btn btn-outline-info">
                <i className="fas fa-sign-out-alt"></i>
                <span>&nbsp; Salir</span>
            </button>
        </div>
    )
}
