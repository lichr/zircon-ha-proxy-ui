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
  panels: {
    currentPanel: string;
    dialog: IDialog | null;
    panels: {
      project: any;
      help: any;
    }
  }
}

