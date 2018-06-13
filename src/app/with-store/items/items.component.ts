import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '../store/app.store';
import {IItems} from '../../model/IItem';

@Component({
  selector: 'app-items',
  templateUrl: 'items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent {
  constructor(public store: Store) {
  }

  get items(): IItems {
    return this.store.items;
  }
}
