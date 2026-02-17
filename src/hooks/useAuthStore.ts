import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';
import type { RootState } from '../store';

export const useAuthStore = () => {

    // Del estado toma el auth, y del auth toma status, user y errorMessage
    const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    console.log({ status, user, errorMessage });

    const startLogin = async ({ email, password }: { email: string; password: string }) => {
        console.log({ email, password });
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            console.log(data)
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error: any) {
            //console.log(error.response.data?.msg || error.message || 'Error en el login');
            dispatch(onLogout(error.response.data?.msg || error.message || 'Error en el login'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ email, password, name }: { email: string; password: string; name: string }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/new', { email, password, name });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error: any) {
            //console.log(error.response?.data?.msg)
            dispatch(onLogout(error.response?.data?.msg || error.message || 'Error en el registro'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        //if (!token) return dispatch(onLogout('No hay Token!'));
        if (!token) return dispatch(onLogout(undefined));

        try {
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            //dispatch(onLogout('Token expiró!'));
            dispatch(onLogout('Token expiró!'));
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout(undefined));
        //dispatch(onLogout('Saliendo...'));
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}