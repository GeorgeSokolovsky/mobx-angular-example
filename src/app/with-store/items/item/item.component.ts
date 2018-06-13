import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IItem} from '../../../model/IItem';
import {action} from 'mobx-angular';
import {Store} from '../../store/app.store';

@Component({
  selector: 'app-item',
  templateUrl: 'item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input() item: IItem;

  constructor(private store: Store) {
  }

  @action
  addItem() {
    this.store.selected.push(this.item);
  }
}
