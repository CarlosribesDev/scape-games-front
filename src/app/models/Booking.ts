import { Day } from "./Day";

export interface Booking {
  id:number | null;
  hour: string;
  day_id: number;
  isBusy: boolean;
  user_id: number | null;
}
