import { TypeContainer } from '@walkme/types';

export class Container<UIModel extends Mappable<DataModel>, NewItemData, DataModel>
  implements TypeContainer<UIModel, NewItemData> {
  private _items: Array<UIModel>;
  _spyCallback: (item: UIModel, prop: string | number | symbol) => void = (_0, _1) => {};
  public [Symbol.iterator]: () => Iterator<UIModel>;
  constructor(
    itemsData: Array<DataModel>,
    private _getUIModel: (data: DataModel) => UIModel,
    private _newDataModel: (index: number, data?: NewItemData) => DataModel,
  ) {
    this._items = itemsData.map((item) => {
      const _this = this;
      return new Proxy(this._getUIModel(item), {
        set(obj, prop) {
          _this._spyCallback(obj, prop);
          //@ts-ignore
          return obj[prop];
        },
      });
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

  public spy(callback: (item: UIModel, prop: string | number | symbol) => void) {
    this._spyCallback = callback;
  }
}

export interface Mappable<DataModel> {
  id: number;
  toDataModel(index: number): DataModel;
}
