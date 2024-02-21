import EventEmitter from 'eventemitter3';
import { produce } from 'immer';
import { IPageConfig } from '../page-config';
import { IPageState, Updater } from './types';

export class PageCore {
  config: IPageConfig
  state: IPageState;
  emitter = new EventEmitter();

  constructor(
    config: IPageConfig
  ) {
    this.config = config;
    this.state = {
      panels: {
        currentPanel: 'project',
        dialog: null,
        panels: {
          project: {},
          help: {}
        }
      }
    };
  }

  update(updater: Updater ) {
    const next = produce(this.state, updater);
    const old = this.state;
    if (next !== old) {
      this.state = next;
      this.emitter.emit('state-update', next, old);
    }
  }
}
