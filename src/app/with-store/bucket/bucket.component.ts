import {ChangeDetectionStrategy, Component} from '@angular/core';
import {action} from 'mobx-angular';
import {Store} from '../store/app.store';
import {IItem} from '../../model/IItem';
import {without} from '../../../utils/without';

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
    this.store.selected = without(this.store.selected, item);
  }

  @action
  clearBucket() {
    this.store.selected = [];
  }
}
