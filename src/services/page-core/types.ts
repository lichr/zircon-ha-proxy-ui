import { IUserInfo } from '../types';

export type ApiInvokeStatus = 'stop' | 'start' | 'pending' | 'ok' | 'error';

export interface IApiState<T=any,R=any> {
  data: T | null;
  result: R | null;
  status: ApiInvokeStatus;
  error: any;
}
export interface IApiInvoke<T=any,R=any, F=()=>void> {
  start: F;
  state: IApiState<T,R>;
}

export interface IOfflineConfig {
  activeBundle: string | null;
  bundles: Record<string, any>;
}

export type Updater = (draft: IPageState) => void
export interface IDialog<T=any> {
  type: string;
  config: T;
}

export interface IProjectEntry {
  id: string;
  project: any;
  online: any;
  offline: any;
}

export interface IProjectPanel {
  project: IProjectEntry | null;
}

export interface IPageState {
  userInfo: IUserInfo | null;
  dialog: IDialog | null;
  currentTab: string;
  currentPanel: string;
  panels: {
    project: any;
    help: any;
  }
}
