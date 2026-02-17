import { useEffect, useState } from 'react';
import { Calendar, type View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../../helpers';

import { Navbar, CalendarEventComponent, type CalendarEventBasic, CalendarModal, FabAddNew, FabDelete } from "../"
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

// const events: CalendarEventBasic[] = [{
//     title: 'Meeting2',
//     notes: 'Meeting with the team',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         _id: '1',
//         name: 'Juan',
//     }
// }]


export const CalendarPage = () => {
    const { user } = useAuthStore();
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const [lastView, setLastView] = useState((localStorage.getItem('lastView') || 'week') as View);
    const [date, setDate] = useState(new Date());

    const eventStyleGetter = (event: CalendarEventBasic, start: Date, end: Date, isSelected: boolean) => {

        console.log({ event, start, end, isSelected });

        const isMyEvent = ((user as any)?.uid === event.user._id) || (user as any)?.uid === event.user.uid;

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = (event: CalendarEventBasic) => {
        console.log({ doubleClick: event });
        openDateModal();
    }

    const onSelect = (event: CalendarEventBasic) => {
        console.log({ click: event });
        setActiveEvent(event);
    }

    const onViewChanged = (event: View) => {
        console.log({ onViewChanged: event });
        localStorage.setItem('lastView', event);
        setLastView(event)
    }

    // This useEffect is used to load the events from the backend when
    // the calendar page is loaded.
    useEffect(() => {
        startLoadingEvents();
    }, []);

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                view={lastView}
                //onView={setLastView}
                defaultView={lastView}
                date={date}
                onNavigate={setDate}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEventComponent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>



    )
}
