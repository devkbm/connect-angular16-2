export interface WorkCalendarEvent {
  id: string | null;
  text: string | null;
  start: string | null;
  end: string | null;
  allDay: boolean | null;
  workCalendarId: string | null;
  color?: string;
}
