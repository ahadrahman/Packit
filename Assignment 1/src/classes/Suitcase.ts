export class Suitcase {
  suitcaseName: string;
  id: string;
  colour: string;

  constructor(suitcaseName: string, colour: string) {
    this.suitcaseName = suitcaseName;
    this.id = "";
    this.colour = colour;
  }

  display(): void {
    alert("Suitcase Name: " + this.suitcaseName);
  }

  setID(id: string) {
    this.id = id;
  }
}
export default Suitcase;