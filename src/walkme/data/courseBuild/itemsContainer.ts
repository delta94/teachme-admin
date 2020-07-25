import { TypeContainer } from '@walkme/types';

export class Container<UIModel extends Mappable<DataModel>, NewItemData, DataModel>
  implements TypeContainer<UIModel, NewItemData> {
  private _items: Array<UIModel>;
  public [Symbol.iterator]: () => Iterator<UIModel>;
  constructor(
    itemsData: Array<DataModel>,
    private _getUIModel: (data: DataModel) => UIModel,
    private _newDataModel: (index: number, data?: NewItemData) => DataModel,
  ) {
    this._items = itemsData.map((item) => {
      return this._getUIModel(item);
    });
    this[Symbol.iterator] = this._items[Symbol.iterator];
  }

  public toDataModel(): Array<DataModel> {
    return this._items.map((item, index) => {
      return item.toDataModel(index);
    });
  }

  public toArray(): Array<UIModel> {
    return this._items;
  }

  public getItem(index: number): UIModel {
    return this._items[index];
  }

  public updateIndex(item: UIModel, index: number): void {
    this._items[index] = item;
  }

  public changeIndex(item: UIModel, index: number): void {
    this.removeItem(item);
    this._items.splice(index, 0, item);
  }

  public addNewItem(index: number = this._items.length, data?: NewItemData): UIModel {
    const itemData = this._newDataModel(index, data);
    const item = this._getUIModel(itemData);
    this._items.splice(index, 0, item);
    return item;
  }

  public removeItem(item: UIModel): void {
    const index = this._items.findIndex((i) => i.id == item.id);
    if (index == -1) return;

    this._items.splice(index, 1);
  }
}

export interface Mappable<DataModel> {
  id: number;
  toDataModel(index: number): DataModel;
}
