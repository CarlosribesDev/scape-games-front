import { Booking } from './Booking';
import { Schedule } from './Schedule';

export interface Day {
    id:number;
    date: Date;
    bookings: Booking[];
    busy: boolean;
}
