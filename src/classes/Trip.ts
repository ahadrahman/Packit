export class Trip {
  tripName: string;
  startDate: Date;
  endDate: Date;

  constructor(tripname: string, startdate: Date, enddate: Date) {
    this.tripName = tripname;
    this.startDate = startdate;
    this.endDate = enddate;
  }

  display(): void {
    alert("TripName: " + this.tripName + "\n" + "Start Date: " + this.startDate + "\n" + "End Date: " + this.endDate);
  }

  formatDate(): string {
    return this.startDate + " to " + this.endDate;
  }
}
export default Trip;