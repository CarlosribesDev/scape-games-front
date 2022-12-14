import { Booking } from './Booking';
import { Schedule } from './Schedule';

export interface Day {

    date: Date;
    schedule:Schedule | null;
    isHoliday: boolean;
    bookings: Booking[];
}
