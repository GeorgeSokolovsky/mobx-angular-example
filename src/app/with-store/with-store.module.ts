import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule, MatListModule} from '@angular/material';
import {MobxAngularModule} from 'mobx-angular';

import {BucketComponent} from './bucket/bucket.component';
import {ItemsComponent} from './items/items.component';
import {ItemComponent} from './items/item/item.component';
import {WithStoreComponent} from './with-store.component';
import {Store} from './store/app.store';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MobxAngularModule
  ],
  exports: [WithStoreComponent],
  declarations: [
    BucketComponent,
    ItemsComponent,
    ItemComponent,
    WithStoreComponent
  ],
  providers: [Store]
})
export class WithStoreModule {
}
