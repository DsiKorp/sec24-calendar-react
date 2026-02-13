import { useState } from 'react';
import './LoginPage.css';

export const LoginPage = () => {

    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

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
                        <form className="login-form animate-fade-in">
                            <div className="input-group-custom">
                                <span className="input-icon">✉️</span>
                                <input
                                    type="email"
                                    className="login-input"
                                    placeholder="Correo electrónico"
                                />
                            </div>
                            <div className="input-group-custom">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    className="login-input"
                                    placeholder="Contraseña"
                                />
                            </div>
                            <button type="submit" className="login-btn login-btn-primary">
                                Iniciar sesión
                            </button>
                        </form>
                    ) : (
                        <form className="login-form animate-fade-in">
                            <div className="input-group-custom">
                                <span className="input-icon">👤</span>
                                <input
                                    type="text"
                                    className="login-input"
                                    placeholder="Nombre completo"
                                />
                            </div>
                            <div className="input-group-custom">
                                <span className="input-icon">✉️</span>
                                <input
                                    type="email"
                                    className="login-input"
                                    placeholder="Correo electrónico"
                                />
                            </div>
                            <div className="input-group-custom">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    className="login-input"
                                    placeholder="Contraseña"
                                />
                            </div>
                            <div className="input-group-custom">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    className="login-input"
                                    placeholder="Repita la contraseña"
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