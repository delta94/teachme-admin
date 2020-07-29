import { TypeContainer } from '@walkme/types';

export class Container<UIModel extends Mappable<DataModel>, NewItemData, DataModel>
  implements TypeContainer<UIModel, NewItemData> {
  private _items: Array<UIModel>;
  private _spyCallback: (item: UIModel, prop: string | number | symbol, val: any) => void = (
    _0,
    _1,
  ) => {};
  public [Symbol.iterator]: () => Iterator<UIModel>;
  constructor(
    itemsData: Array<DataModel>,
    private _getUIModel: (data: DataModel) => UIModel,
    private _newDataModel: (index: number, data?: NewItemData) => DataModel,
  ) {
    this._items = itemsData.map((item) => {
      const _this = this;
      return this._proxy(this._getUIModel(item));
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
    const proxyItem = this._proxy(item);
    this._items.splice(index, 0, proxyItem);
    return proxyItem;
  }

  public removeItem(item: UIModel): void {
    const index = this._items.findIndex((i) => i.id == item.id);
    if (index == -1) return;

    this._items.splice(index, 1);
  }

  public spy(callback: (item: UIModel, prop: string | number | symbol, val: any) => void) {
    this._spyCallback = callback;
  }

  private _proxy(item: UIModel): UIModel {
    const _this = this;
    return new Proxy(item, {
      set(obj, prop, val) {
        _this._spyCallback(obj, prop, val);
        //@ts-ignore
        obj[prop] = val;
        return true;
      },
    });
  }
}

export class DeployableContainer<
  UIModel extends MappableAndQueriable<DataModel>,
  NewItemData,
  DataModel
> extends Container<UIModel, NewItemData, DataModel> implements ITypeIdQueriable {
  private _itemsMap: { [key: string]: { [key: number]: boolean } } = {};

  public addNewItem(index?: number, data?: NewItemData): UIModel {
    const item = super.addNewItem(index, data);
    this._itemsMap[item.type] = this._itemsMap[item.type] ?? {};
    this._itemsMap[item.type][item.id] = true;
    return item;
  }

  public removeItem(item: UIModel): void {
    super.removeItem(item);
    this._itemsMap[item.type][item.id] = false;
  }

  public includes(type: string, id: number): boolean {
    return (
      this._itemsMap[type]?.[id] ||
      this.toArray().some(
        (item) => isTypeIdQueriable<ITypeIdQueriable>(item) && item.includes(type, id),
      )
    );
  }
}

export interface Mappable<DataModel> {
  id: number;
  toDataModel(index: number): DataModel;
}

export interface TypeIdQueriable {
  id: number;
  type: string;
}

export interface MappableAndQueriable<T> extends Mappable<T>, TypeIdQueriable {}

export interface ITypeIdQueriable {
  includes(type: string, id: number): boolean;
}

function isTypeIdQueriable<T>(type: any): type is T {
  return typeof (type as any).includes == 'function';
}
