import { BaseEntity } from 'src/modules/shared/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('refreshToken')
export class RefreshToken extends BaseEntity {
  @Column()
  token: string;

  @Column()
  userId: number;

  @Column()
  expiresAt: Date;
}
