import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatListModule} from '@angular/material';

import {WithoutStoreComponent} from './without-store.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [WithoutStoreComponent],
  declarations: [WithoutStoreComponent],
})
export class WithoutStoreModule {
}
