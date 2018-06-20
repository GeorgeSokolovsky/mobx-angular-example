import {Observable} from 'rxjs';
import {spy} from 'mobx';

export enum MobXEvent {
  COMPUTED = 'compute'
}

export function mobXEvents(): Observable<any> {
  return Observable.create(observer => {
    spy(event => observer.next(event));
  });
}
