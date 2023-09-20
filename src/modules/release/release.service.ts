import { LoggerProvider } from '@/utils/logger.util';
import { Injectable } from '@nestjs/common';
import { StateService } from '@/modules/state/state.service';

import { ReleaseQueryDto } from './dtos/release.query.dto';
import { ReleaseObjectDto } from './dtos/release.object.dto';
import { AlreadyLatestException } from '@/common/exceptions/already_latest.exception';
import { ResourceNotAvailableException } from '@/common/exceptions/resource_not_available.exception';

@Injectable()
export class ReleaseService extends LoggerProvider {
  constructor(private readonly stateService: StateService) {
    super();
  }

  async getReleaseAsset(query: ReleaseQueryDto): Promise<ReleaseObjectDto> {
    const defaultQuery = {
      channel: 'stable',
      clientOs: 'win',
      clientArch: 'x64',
      clientVersion: '0.0.0',
    };
    const _query = { ...defaultQuery, ...query };

    if (_query.clientOs === 'macos' || _query.clientOs === 'macos-runtime') {
      _query.clientArch = 'universal';
    }

    if (_query.clientOs === 'linux' && _query.clientArch === 'arm64') {
      _query.clientArch = 'aarch64';
    }

    const releaseInfo = this.stateService.getReleaseInfo(
      query.channel ?? 'stable',
    );

    if (!releaseInfo) {
      throw new ResourceNotAvailableException('无法获取版本信息，请稍后再试');
    }

    if (_query.clientVersion === releaseInfo.version) {
      throw new AlreadyLatestException('当前已是最新版本');
    }

    // check if ota exists
    if (_query.clientVersion !== '0.0.0') {
      const ota = releaseInfo.details.assets.find(
        (asset) =>
          `MAAComponent-OTA-${_query.clientVersion}_${releaseInfo.version}-${_query.clientOs}-${_query.clientArch}.zip` ===
          asset.name,
      );
      if (ota) {
        return { ...ota, version: releaseInfo.version };
      }
    }

    // ota not found, return full package
    const full = releaseInfo.details.assets.find((asset) =>
      new RegExp(
        `MAA-${releaseInfo.version}-${_query.clientOs}-${_query.clientArch}`,
      ).test(asset.name),
    );

    if (!full) {
      throw new ResourceNotAvailableException('无法获取版本信息，请稍后再试');
    }

    return { ...full, version: releaseInfo.version };
  }
}
