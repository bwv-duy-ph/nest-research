import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto, RegiterDto } from '../dto/auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() user: LoginDto): Promise<Record<string, string>> {
    return this.authService.authenticateUser(user);
  }

  @Post('register')
  @ApiBody({ type: RegiterDto })
  async register(
    @Body() user: RegiterDto,
  ): Promise<Record<string, string | number>> {
    return this.authService.register(user);
  }
}
