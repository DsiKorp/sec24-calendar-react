import { useEffect, useState, type FormEvent } from 'react';
import Swal from 'sweetalert2';
import './LoginPage.css';
import { useAuthStore, useForm } from '../../hooks';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const { formState, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    const { loginEmail, loginPassword } = formState;
    const { formState: registerFormState, onInputChange: onRegisterInputChange }
        = useForm(registerFormFields);
    const { registerEmail, registerName, registerPassword, registerPassword2 } = registerFormState;


    const loginSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //console.log({ loginEmail, loginPassword })
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const registerSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({ registerName, registerEmail, registerPassword, registerPassword2 })
        if (registerPassword !== registerPassword2) {
            Swal.fire('Error en el registro', 'Contraseñas no son iguales', 'error');
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Mensaje del sistema', errorMessage, 'info');
        }
    }, [errorMessage])

    return (
        <div className="login-background">
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>

            <div className="login-card">
                <div className="login-card-header">
                    <h2 className="login-title">📅 CalendarApp</h2>
                    <p className="login-subtitle">Organiza tu vida, un día a la vez</p>
                </div>

                <div className="login-tabs">
                    <button
                        className={`login-tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Ingreso
                    </button>
                    <button
                        className={`login-tab ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Registro
                    </button>
                </div>

                <div className="login-card-body">
                    {activeTab === 'login' ? (
                        <form onSubmit={loginSubmit} className="login-form animate-fade-in">
                            <div className="input-group-custom">
                                <span className="input-icon">✉️</span>
                                <input
                                    type="email"
                                    className="login-input"
                                    placeholder="Correo electrónico"
                                    name='loginEmail'
                                    value={loginEmail}
                                    onChange={onLoginInputChange}
                                    required
                                />
                            </div>
                            <div className="input-group-custom">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    className="login-input"
                                    placeholder="Contraseña"
                                    autoComplete="off"
                                    name='loginPassword'
                                    value={loginPassword}
                                    onChange={onLoginInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-btn login-btn-primary">
                                Iniciar sesión
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={registerSubmit} className="login-form animate-fade-in">
                            <div className="input-group-custom">
                                <span className="input-icon">👤</span>
                                <input
                                    type="text"
                                    className="login-input"
                                    placeholder="Nombre completo"
                                    name='registerName'
                                    value={registerName}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="input-group-custom">
                                <span className="input-icon">✉️</span>
                                <input
                                    type="email"
                                    className="login-input"
                                    placeholder="Correo electrónico"
                                    name='registerEmail'
                                    value={registerEmail}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="input-group-custom">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    className="login-input"
                                    placeholder="Contraseña"
                                    name='registerPassword'
                                    value={registerPassword}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="input-group-custom">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    className="login-input"
                                    placeholder="Repita la contraseña"
                                    name='registerPassword2'
                                    value={registerPassword2}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <button type="submit" className="login-btn login-btn-secondary">
                                Crear cuenta
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}