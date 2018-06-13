import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '../store/app.store';
import {action} from 'mobx-angular';
import {IItem} from '../../model/IItem';

@Component({
  selector: 'app-items',
  templateUrl: 'items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent {
  constructor(public store: Store) {
  }

  @action
  selectAll() {
    this.store.selected = [...this.store.selected, ...this.store.freeItems];
  }

  @action
  selectItem(item: IItem) {
    this.store.selected.push(item);
  }
}
