import Item from "./Item";

export class Suitcase {
  suitcaseName: string;
  id: string;
  colour: string;
  items: Item[];

  constructor(suitcaseName: string, colour: string) {
    this.suitcaseName = suitcaseName;
    this.id = "";
    this.colour = colour;
    this.items = [];
  }

  display(): void {
    alert("Suitcase Name: " + this.suitcaseName);
  }

  setID(id: string) {
    this.id = id;
  }
}
export default Suitcase;