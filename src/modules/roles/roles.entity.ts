import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from '../users/users.entity';
import { BaseEntity } from '../shared/base.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  flag: number;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.id)
  user: UserEntity[];
}
