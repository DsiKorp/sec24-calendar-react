import { useState } from 'react';
import { Calendar, type View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../../helpers';

import { Navbar, CalendarEventComponent, type CalendarEventBasic, CalendarModal, FabAddNew, FabDelete } from "../"
import { useUiStore, useCalendarStore } from '../../hooks';

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
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();
    const [lastView, setLastView] = useState((localStorage.getItem('lastView') || 'week') as View);
    const [date, setDate] = useState(new Date());

    const eventStyleGetter = (event: CalendarEventBasic, start: Date, end: Date, isSelected: boolean) => {

        //console.log({ event, start, end, isSelected });

        const style = {
            backgroundColor: '#347CF7',
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
