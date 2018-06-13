import {IItem} from '../app/model/IItem';

export function contains({name}: IItem, search: string): boolean {
  if (!search) {
    return true;
  }

  return name.toUpperCase().includes(search.toUpperCase());
}
