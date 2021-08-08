import { UserRoleEntity } from './user-role.entity';

export type UserEntity = {
  id: number;

  email: string;

  password: string;

  roles: UserRoleEntity[];

  main_clock_id: number | null;
}
