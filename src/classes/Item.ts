export class Item {
  itemName: string;
  id: string;

  constructor(itemName: string) {
    this.itemName = itemName;
    this.id = "";
  }

  display(): void {
    alert("Item Name: " + this.itemName);
  }

  setID(id: string) {
    this.id = id;
  }
}
export default Item;