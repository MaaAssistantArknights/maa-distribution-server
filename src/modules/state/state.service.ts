import { Injectable } from '@nestjs/common';

import { ReleaseObjectDto } from '@/modules/release/dtos/release.object.dto';

export type Channel = 'stable' | 'beta' | 'alpha';

export type ReleaseChannelInfo = {
  version: string;
  details: {
    assets: ReleaseObjectDto[];
  };
};

type ReleaseState = {
  [k in Channel]?: ReleaseChannelInfo;
};

@Injectable()
export class StateService {
  private _state: ReleaseState = {};

  public setReleaseInfo(channel: Channel, info: ReleaseChannelInfo) {
    this._state[channel] = info;
  }

  public getReleaseInfo(channel: Channel): ReleaseChannelInfo | undefined {
    return this._state[channel];
  }
}
