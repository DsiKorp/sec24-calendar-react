export interface CalendarEvent {
    _id?: string;
    event?: CalendarEventBasic;
    continuesPrior?: boolean;
    continuesAfter?: boolean;
    title?: string;
    isAllDay?: null;
    localizer?: Localizer;
    slotStart?: Date;
    slotEnd?: Date;
}

export interface CalendarEventBasic {
    _id?: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: User;
}

export interface User {
    _id: string;
    name: string;
}

export interface Localizer {
    formats: Formats;
    segmentOffset: number;
    messages: Messages;
}

export interface Formats {
    dateFormat: string;
    dayFormat: string;
    weekdayFormat: string;
    timeGutterFormat: string;
    monthHeaderFormat: string;
    dayHeaderFormat: string;
    agendaDateFormat: string;
    agendaTimeFormat: string;
}

export interface Messages {
    date: string;
    time: string;
    event: string;
    allDay: string;
    week: string;
    work_week: string;
    day: string;
    month: string;
    previous: string;
    next: string;
    yesterday: string;
    tomorrow: string;
    today: string;
    agenda: string;
    noEventsInRange: string;
}
