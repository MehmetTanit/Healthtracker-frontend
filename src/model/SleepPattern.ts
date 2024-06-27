export class SleepPattern {

    id: number;
    dateRecorded: Date;
    sleepDuration: number;

    constructor(id: number, dateRecorded: Date, sleepDuration: number) {
        this.id = id;
        this.dateRecorded = dateRecorded;
        this.sleepDuration = sleepDuration;
    }
}