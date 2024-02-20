import { IPageConfig, PageConfigProvider } from '../page-config';

export class PageCore {
  config: IPageConfig
  constructor(
    config: IPageConfig
  ) {
    this.config = config;
  }
}
