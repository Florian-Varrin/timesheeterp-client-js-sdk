import { EventTypeEnum } from '../enums/event-type.enum';

export type ClockEvent = {
  id: number;

  type: EventTypeEnum;

  date: Date;

  clock_id: number;
}
