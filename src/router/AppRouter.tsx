import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { CustomFullScreenLoading } from '../components/CustomFullScreenLoading';


export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    //const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';
    //console.log(getEnvVariables());
    useEffect(() => {
        checkAuthToken();
    }, [])

    if (status === 'checking') {
        return (
            <CustomFullScreenLoading />
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }

        </Routes>
    )
}
