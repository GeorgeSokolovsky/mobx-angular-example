import {IItem, IItems} from '../app/model/IItem';

export function without(list: IItems, item: IItem): IItems {
  const index = list.indexOf(item);
  const beforeItem = list.slice(0, index);
  const afterItem = list.slice(index + 1);

  return beforeItem.concat(afterItem);
}
