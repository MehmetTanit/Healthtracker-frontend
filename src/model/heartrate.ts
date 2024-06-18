export class HeartRate {

    dateRecorded: Date;
    heartRateValue: number;

    constructor(id: number, dateRecorded: Date, heartRateValue: number) {
        this.dateRecorded = dateRecorded;
        this.heartRateValue = heartRateValue;
    }

}
