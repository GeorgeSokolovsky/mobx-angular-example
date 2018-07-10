import {ChangeDetectionStrategy, Component} from '@angular/core';
import {action} from 'mobx-angular';
import {Store} from '../store/app.store';
import {IItem} from '../../model/IItem';

@Component({
  selector: 'app-bucket',
  templateUrl: 'bucket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketComponent {
  constructor(private store: Store) {
  }

  get items() {
    return this.store.selected;
  }

  get count() {
    return this.store.selectedCount;
  }

  @action
  excludeItem(item: IItem) {
    item.selected = false;
  }

  @action
  clearBucket() {
    this.store.selected.forEach(this.excludeItem);
  }
}
