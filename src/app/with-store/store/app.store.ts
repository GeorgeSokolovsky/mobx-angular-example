import {Injectable} from '@angular/core';
import {computed, observable} from 'mobx-angular';
import {IItems} from '../../model/IItem';
import {contains} from '../../../utils/contains';

@Injectable()
export class Store {
  @observable
  selected: IItems = [];
  @observable
  filter = '';
  @observable
  name = '';
  @observable
  items: IItems = [];

  @computed
  get freeItems(): IItems {
    return this.items.filter(item => contains(item, this.filter) && !this.selected.includes(item));
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
