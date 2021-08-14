import {ClockAction} from './clock-action.entity';
import {ClockEvent} from './clock-event.entity';

export type ClockEntity = {
  id: number;

  name: string;

  current_time_in_seconds: number;

  current_time_formatted: string;

  status: 'RUNNING' | 'STOPPED';

  user_id: number;

  actions: ClockAction[]

  events: ClockEvent[];
}
