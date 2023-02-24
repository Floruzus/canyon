import { Controller, Get } from '@nestjs/common'
import { ParameterService } from '../Service'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from '../Entity'
import { Model } from 'mongoose'

@Controller()
export class AppController {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private parametersService: ParameterService
  ) {}

  @Get('GetServerInformation')
  async getServerInformation() {
    const numberOfRegistered = await this.userModel.count({ isActive: true })

    const activatedHolidaySceneryGroups = this.parametersService.get<Array<string>>('server.parameters.sceneryGroups')
    const disactivatedHolidaySceneryGroups = this.parametersService
      .get<Array<string>>('server.parameters.sceneryGroups')
      .map(scenery => `${scenery}_DISABLE`)
    const happyHourMultiplier = this.parametersService.get<number>('server.parameters.happyHour.multiplier')

    return {
      serverName: this.parametersService.get<string>('server.name'),
      country: this.parametersService.get<string>('server.country'),
      adminList: this.parametersService.get<Array<string>>('server.admins').join(','),
      ownerList: this.parametersService.get<Array<string>>('server.owners').join(','),
      homePageUrl: this.parametersService.get<string>('server.url.homepage'),
      facebookUrl: this.parametersService.get<string>('server.url.facebook'),
      twitterUrl: this.parametersService.get<string>('server.url.twitter'),
      discordUrl: this.parametersService.get<string>('server.url.discord'),
      bannerUrl: this.parametersService.get<string>('server.url.banner'),
      webRecoveryUrl: this.parametersService.get<string>('server.url.recovery'),
      webPanelUrl: this.parametersService.get<string>('server.url.driver'),
      onlineNumber: 0,
      numberOfRegistered,
      secondsToShutDown: this.parametersService.get<number>('server.parameters.secondsToShutdown'),
      requireTicket: this.parametersService.get<number>('server.parameters.requireTicket'),
      activatedHolidaySceneryGroups,
      disactivatedHolidaySceneryGroups,
      cashRewardMultiplier: this.parametersService.get<number>('server.parameters.multipliers.cashReward'),
      repRewardMultiplier: this.parametersService.get<number>('server.parameters.multipliers.repReward'),
      playerCountRewardMultiplier: this.parametersService.get<number>(
        'server.parameters.multipliers.playerCountReward'
      ),
      happyHourMultiplier,
      happyHourEnabled: false,
      serverVersion: `Canyon v${process.env.npm_package_version}`
    }
  }
}
