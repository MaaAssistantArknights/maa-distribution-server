import { IsOptional, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReleaseQueryDto {
  @ApiProperty({
    name: 'channel',
    description: '版本更新频道',
    required: false,
    enum: ['stable', 'beta', 'alpha'],
  })
  @IsOptional()
  @IsIn(['stable', 'beta', 'alpha'], {
    message: '版本更新频道必须是stable、beta或alpha',
  })
  channel?: 'stable' | 'beta' | 'alpha';

  @ApiProperty({
    name: 'clientVersion',
    description: '客户端版本号',
    required: false,
  })
  @IsOptional()
  @IsString({ message: '客户端版本号必须是字符串' })
  clientVersion?: string;

  @ApiProperty({
    name: 'clientOs',
    description: '客户端操作系统',
    required: false,
    enum: ['win', 'macos', 'linux', 'macos-runtime'],
  })
  @IsOptional()
  @IsIn(['win', 'macos', 'linux', 'macos-runtime'], {
    message: '客户端操作系统必须是win、macos、linux或macos-runtime',
  })
  clientOs?: 'win' | 'macos' | 'linux';

  @ApiProperty({
    name: 'clientArch',
    description: '客户端架构',
    required: false,
    enum: ['x64', 'arm64'],
  })
  @IsOptional()
  @IsIn(['x64', 'arm64'], {
    message: '客户端架构必须是x64或arm64',
  })
  clientArch?: 'x64' | 'arm64';
}
