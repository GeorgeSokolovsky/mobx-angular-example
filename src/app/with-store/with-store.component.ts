import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Store} from './store/app.store';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {IItems} from '../model/IItem';
import {action} from 'mobx-angular';

@Component({
  selector: 'app-with-store',
  templateUrl: 'with-store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithStoreComponent implements OnInit, OnDestroy {
  name = new FormControl();
  filter = new FormControl();

  private readonly destroy$ = new Subject<void>();

  constructor(private api: ApiService,
              private store: Store) {
  }

  ngOnInit() {
    this.api.getItems()
      .subscribe(items => this.setItems(items));

    this.name.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => this.store.name = value);

    this.filter.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => this.store.filter = value);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @action
  addItem() {
    const id = this.store.items.length + 1;

    this.store.items.push({id, name: this.name.value, selected: false});

    this.store.name = '';
    this.name.setValue('');
  }

  @action
  setItems(items: IItems) {
    this.store.items = items;
  }
}
