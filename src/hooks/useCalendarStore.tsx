import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';

import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent, type RootState } from '../store';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    // Del estado tome el calendar, y del calendar tome events y activeEvent
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
    // Del estado tome auth, y del auth tome el user
    const { user } = useSelector((state: RootState) => state.auth);

    const setActiveEvent = (calendarEvent: any) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent: any) => {

        try {
            // Actualizando
            if (calendarEvent.id) {
                //const { data } = calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            console.log({ data })
            //dispatch(onAddNewEvent({ ...calendarEvent, id: new Date().getTime() }));
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
        } catch (error) {
            // This error usually occurs when I try to modify an event that belongs to someone else.
            //console.log(error);
            const axiosError = axios.isAxiosError(error) ? error : null;
            Swal.fire('Error al guardar', axiosError?.response?.data?.msg || 'No se pudo guardar el evento', 'error');
        }
    }

    const startDeletingEvent = async () => {

        try {
            await calendarApi.delete(`/events/${activeEvent?.id}`);
            dispatch(onDeleteEvent());

        } catch (error) {
            const axiosError = axios.isAxiosError(error) ? error : null;
            Swal.fire('Error al eliminar', axiosError?.response?.data?.msg || 'No se pudo eliminar el evento', 'error');
        }

    }

    // start loading events, this is called when the calendar page is loaded, 
    // and it will load the events from the backend and store them in the redux store.
    const startLoadingEvents = async () => {

        try {
            const { data } = await calendarApi.get('/events');
            //console.log({ data });
            const events = convertEventsToDateEvents(data.eventos);
            console.log(events);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log(`Error cargando eventos: ${error}`)
        }
    }




    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}
