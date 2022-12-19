import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  readonly password: string;
}
