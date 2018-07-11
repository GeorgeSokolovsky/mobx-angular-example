import {Injectable} from '@angular/core';
import {computed, observable} from 'mobx-angular';
import {IItems} from '../../model/IItem';
import {contains} from '../../../utils/contains';
import {log} from '../../../utils/log';

@Injectable()
export class Store {
  @observable
  filter = '';
  @observable
  name = '';
  @observable
  items: IItems = [];

  @computed
  @log
  get selected(): IItems {
    return this.items.filter(({selected}) => selected);
  }

  @computed
  @log
  get freeItems(): IItems {
    return this.items.filter(item => contains(item, this.filter) && !item.selected);
  }

  @computed
  @log
  get canSelectAll(): boolean {
    return !!this.freeItems.length;
  }

  @computed
  @log
  get selectedCount(): number {
    return this.selected.length;
  }
}
