import {Injectable} from '@angular/core';
import {action, computed, observable} from 'mobx-angular';
import {IItems} from '../../model/IItem';

@Injectable()
export class Store {
  @observable items: IItems = [];
  @observable selected: IItems = [];
  @observable filter = '';
  @observable name = '';

  @computed get selectedCount(): number {
    return this.selected.length;
  }

  @action
  addItem() {
    const id = this.items.length + 1;

    this.items.push({id, name: this.name});

    this.name = '';
  }

  @action
  setItems(items: IItems) {
    this.items = items;
  }
}
