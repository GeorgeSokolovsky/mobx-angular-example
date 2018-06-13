import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IItems} from '../app/model/IItem';
import {pluck} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getItems(): Observable<IItems> {
    return this.http.get('/assets/items.json')
      .pipe(pluck('items')) as Observable<IItems>;
  }
}
