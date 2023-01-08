import { Game } from "./Game";

export interface Booking {
  id?:number ;
  hour: string;
  dayId: number;
  date: Date;
  game?: Game;
  userId?: number;
}
