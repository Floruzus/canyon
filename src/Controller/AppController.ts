import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('GetServerInformation')
  getServerInformation(): object {
    return {}
  }
}
