import { Controller, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request): string {
    const clientIp = req.ip; // Obtiene la dirección IP del cliente que hizo la solicitud
    return `La dirección IP externa del cliente es: ${clientIp}`;
    // return this.appService.getHello();
  }

  @Post()
  getPost() {
    return this.appService.postHello()
  }
}
