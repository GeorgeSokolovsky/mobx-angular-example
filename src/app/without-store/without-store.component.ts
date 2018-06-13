import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {action, autorun, computed, observable} from 'mobx';
import {log} from '../../utils/log';
import {IItem, IItems} from '../model/IItem';
import {ApiService} from '../../services/api.service';
import {without} from '../../utils/without';
import {IReactionDisposer} from 'mobx/lib/core/reaction';
import {contains} from '../../utils/contains';

@Component({
  selector: 'app-without-store',
  templateUrl: 'without-store.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithoutStoreComponent implements OnInit, OnDestroy {
  name = new FormControl();
  filter = new FormControl();

  // @observable
  selected: IItems = [];
  // @observable
  private _items: IItems = [];
  // @observable
  private filterValue = '';

  private dispose: IReactionDisposer;

  constructor(private api: ApiService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.api.getItems()
      .subscribe(items => {
        this._items = items;
        // this.cd.detectChanges();
      });

    this.filter.valueChanges.subscribe(v => this.filterValue = v);

    // this.dispose = autorun(() => this.cd.detectChanges());
  }

  ngOnDestroy() {
    // this.dispose();
  }

  // @computed
  // @log
  get selectedCount(): number {
    return this.selected.length;
  }

  // @computed
  // @log
  get items(): IItems {
    return this._items.filter(item =>
      contains(item, this.filterValue)
      && !this.selected.includes(item)
    );
  }

  // @computed
  // @log
  get canSelectAll(): boolean {
    return !!this.items.length;
  }

  // @action
  selectItem(item: IItem) {
    this.selected.push(item);
  }

  // @action
  selectAll() {
    this.selected = [...this.selected, ...this.items];
  }

  // @action
  excludeItem(item: IItem) {
    this.selected = without(this.selected, item);
  }

  // @action
  addItem() {
    if (!this.name.value) {
      return;
    }

    const id = this._items.length + 1;

    this._items.push({id, name: this.name.value});

    this.name.setValue('');
  }

  // @action
  clearBucket() {
    if (this.selected.length) {
      this.selected = [];
    }
  }
}
