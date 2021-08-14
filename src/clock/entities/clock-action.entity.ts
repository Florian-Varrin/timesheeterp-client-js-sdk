import { ActionTypeEnum } from '../enums/action-type.enum';

export type ClockAction = {
  id: number;

  type: ActionTypeEnum;

  time: number;

  clock_id: number;
}
