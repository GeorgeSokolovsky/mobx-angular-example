import {Injectable} from '@angular/core';
import {computed, observable} from 'mobx-angular';
import {IItems} from '../../model/IItem';
import {contains} from '../../../utils/contains';

@Injectable()
export class Store {
  @observable
  filter = '';
  @observable
  name = '';
  @observable
  items: IItems = [];

  @computed
  get selected(): IItems {
    return this.items.filter(({selected}) => selected);
  }

  @computed
  get freeItems(): IItems {
    return this.items.filter(item => contains(item, this.filter) && !item.selected);
  }

  @computed
  get canSelectAll(): boolean {
    return !!this.freeItems.length;
  }

  @computed
  get selectedCount(): number {
    return this.selected.length;
  }
}
