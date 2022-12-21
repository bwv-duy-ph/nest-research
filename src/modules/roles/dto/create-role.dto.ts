import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  flag: number;
}
