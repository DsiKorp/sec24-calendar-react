export const CustomFullScreenLoading = () => {
    return (
        <div className="vh-100 vw-100 d-flex align-items-center justify-content-center bg-body-tertiary">
            <div className="bg-body border border-secondary-subtle rounded-4 p-4 p-md-5 text-center" style={{ width: 'min(92vw, 420px)' }}>
                <div className="d-flex flex-column align-items-center">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary mb-3" style={{ width: '52px', height: '52px' }}>
                        <span className="fs-5" aria-hidden="true">📅</span>
                    </div>
                    <h5 className="mb-1 fw-semibold text-body">Cargando calendario</h5>
                    <p className="text-body-secondary mb-3 small">Preparando tus eventos...</p>
                </div>

                <div className="progress mb-3" role="progressbar" aria-label="Carga" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} style={{ height: '8px' }}>
                    <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '65%' }} />
                </div>

                <div className="d-flex align-items-center justify-content-center gap-2 text-primary">
                    <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    <small className="fw-medium">Un momento...</small>
                </div>
            </div>
        </div>
    )
}
