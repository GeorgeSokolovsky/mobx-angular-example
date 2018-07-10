import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {action, autorun, computed, observable} from 'mobx';
import {log} from '../../utils/log';
import {IItem, IItems} from '../model/IItem';
import {ApiService} from '../../services/api.service';
import {IReactionDisposer} from 'mobx/lib/core/reaction';
import {contains} from '../../utils/contains';
import {MobXEvent, mobXEvents} from '../../utils/debug';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-without-store',
  templateUrl: 'without-store.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithoutStoreComponent implements OnInit, OnDestroy {
  name = new FormControl();
  filterControl = new FormControl();

  // @observable
  private _items: IItems = [];
  // @observable
  private filter = '';

  // private dispose: IReactionDisposer;

  constructor(private api: ApiService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.api.getItems()
      .subscribe(items => {
        this._items = items;
      });

    this.filterControl.valueChanges.subscribe(v => this.filter = v);

    // this.dispose = autorun(() => this.cd.detectChanges());

    // mobXEvents()
    //   .pipe(filter(({type}) => type === MobXEvent.COMPUTED))
    //   .subscribe(console.log);
  }

  ngOnDestroy() {
    // this.dispose();
  }

  // @computed
  // @log
  get selected(): IItems {
    return this._items.filter(({selected}) => selected);
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
      contains(item, this.filter)
      && !item.selected
    );
  }

  // @computed
  // @log
  get canSelectAll(): boolean {
    return !!this.items.length;
  }

  // @action
  selectItem(item: IItem) {
    item.selected = true;
  }

  // @action
  selectAll() {
    this.items.forEach(this.selectItem);
  }

  // @action
  excludeItem(item: IItem) {
    item.selected = false;
  }

  // @action
  addItem() {
    if (!this.name.value) {
      return;
    }

    const id = this._items.length + 1;

    this._items.push({id, name: this.name.value, selected: false});

    this.name.setValue('');
  }

  // @action
  clearBucket() {
    if (this.selected.length) {
      this.selected.forEach(this.excludeItem);
    }
  }
}
