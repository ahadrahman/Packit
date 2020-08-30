import Suitcase from "./Suitcase";

export class Trip {
  tripName: string;
  startDate: Date;
  endDate: Date;
  location: string;
  suitcases: Suitcase[];
  id: string;

  constructor(tripname: string, startdate: Date, enddate: Date, location: string) {
    this.tripName = tripname;
    this.startDate = startdate;
    this.endDate = enddate;
    this.suitcases = [];
    this.id = "";
    this.location = location;
  }

  display(): void {
    alert("TripName: " + this.tripName + "\n" + "Start Date: " + this.startDate + "\n" + "End Date: " + this.endDate);
  }

  formatDate(): string {
    return this.startDate + " to " + this.endDate;
  }

  setID(id: string) {
    this.id = id;
  }

  addSuitcase(suitcase: Suitcase) {
    this.suitcases.push(suitcase);
  }
}
export default Trip;