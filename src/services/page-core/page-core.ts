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
      userInfo: null,
      panels: [{ id: 'project' }],
      dialog: null
    };
  }

  update(updater: Updater) {
    const next = produce(this.state, updater);
    const old = this.state;
    if (next !== old) {
      this.state = next;
      this.emitter.emit('state-update', next, old);
    }
  }

  go(id: string, config?: any) {
    this.update((state) => {
      state.panels.push({ id, config });
    });
  }

  switch(id: string, config?: any) {
    if (this.state.panels.length > 1) {
      this.update((state) => {
        state.panels.pop();
        state.panels.push({ id, config });
      });
    }
  }

  goBack() {
    if (this.state.panels.length > 1) {
      this.update((state) => {
        state.panels.pop();
      });
    }
  }
}
