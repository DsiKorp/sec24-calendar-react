// import type { EventProps } from "react-big-calendar";
// import type { CalendarEvent } from "../";


export const CalendarEventComponent = (event: any) => {

    console.log('CalendarEventComponentCalendarEventComponentCalendarEventComponent')
    console.log(event);
    const { title, user } = event.event;

    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
    )
}
