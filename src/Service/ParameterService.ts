import { Injectable } from '@nestjs/common'
import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'

@Injectable()
export class ParameterService {
  private yaml: any
  constructor() {
    this.reload()
  }

  reload() {
    this.yaml = yaml.load(
      readFileSync(join(__dirname, '..', '..', 'config/config.yaml'), 'utf8')
    )
  }

  get<T = any>(key: string, defaultValue = undefined): T {
    return key.split('.').reduce((o, i) => o[i], this.yaml) ?? defaultValue
  }
}
