import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { LoggerProvider } from '@/utils/logger.util';
import {
  ReleaseChannelInfo,
  StateService,
  Channel,
} from '@/modules/state/state.service';

@Injectable()
export class UpdateService extends LoggerProvider {
  constructor(private readonly stateService: StateService) {
    super();
  }
  @Interval(600000)
  async update() {
    this.logger.log('Start updating release info.');
    const baseurl = 'https://ota.maa.plus/MaaAssistantArknights/api/version/';
    const channels: Channel[] = ['alpha', 'beta', 'stable'];

    Promise.all(
      channels.map(async (channel) => {
        const url = baseurl + channel + '.json';
        const res = await axios.get(url, {
          maxContentLength: 200000,
          maxBodyLength: 200000,
        });
        const data: ReleaseChannelInfo = res.data;
        this.stateService.setReleaseInfo(channel, data);
        this.logger.log(`[${channel}] updated`);
      }),
    )
      .then(() => {
        this.logger.log('All release info updated.');
      })
      .catch((err) => {
        this.logger.error(`Update release info failed: ${err}`);
      });
  }
}
