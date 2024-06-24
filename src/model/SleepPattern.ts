export class SleepPattern {

    id: number;
    dateRecorded: Date;
    sleepDuration: number;

    constructor(dateRecorded: Date, sleepDuration: number, id: number) {
        this.id = id;
        this.dateRecorded = dateRecorded;
        this.sleepDuration = sleepDuration;
    }
}