import { TypeContainer } from '@walkme/types';

export class Container<UIModel extends Mappable<DataModel>, NewItemData, DataModel>
  implements TypeContainer<UIModel, NewItemData> {
  private items: Array<UIModel>;
  public [Symbol.iterator]: () => Iterator<UIModel>;
  constructor(
    itemsData: Array<DataModel>,
    private getUIModel: (data: DataModel) => UIModel,
    private newDataModel: (index: number, data: NewItemData) => DataModel,
  ) {
    this.items = itemsData.map((item) => {
      return this.getUIModel(item);
    });
    this[Symbol.iterator] = this.items[Symbol.iterator];
  }

  public toDataModel(): Array<DataModel> {
    return this.items.map((item, index) => {
      return item.toDataModel(index);
    });
  }

  public toArray(): Array<UIModel> {
    return this.items;
  }

  public getItem(index: number): UIModel {
    return this.items[index];
  }

  public changeIndex(item: UIModel, index: number): void {
    this.removeItem(item);
    this.items.splice(index, 0);
  }

  public addNewItem(data: NewItemData): UIModel {
    const itemData = this.newDataModel(this.items.length, data);
    const item = this.getUIModel(itemData);
    this.items.push(item);
    return item;
  }

  public removeItem(item: UIModel): void {
    const index = this.items.findIndex((i) => i.id == item.id);
    if (index == -1) return;

    this.items.splice(index, 1);
  }
}

export interface Mappable<DataModel> {
  id: number;
  toDataModel(index: number): DataModel;
}
