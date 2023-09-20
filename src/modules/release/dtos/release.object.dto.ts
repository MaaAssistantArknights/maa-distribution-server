export class ReleaseObjectDto {
  name: string;
  version: string;
  size: number;
  browser_download_url: string;
  mirrors: string[];
  mirrors_outer: string[];
  mirrors_inner: string[];
}
