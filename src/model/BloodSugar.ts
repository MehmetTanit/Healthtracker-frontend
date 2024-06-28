export class BloodSugar {
    id: number;
    dateRecorded: Date;
    value: number;
    unit: string;

    constructor(
        id: number,
        dateRecorded: Date,
        value: number,
        unit: string
    ) {
        this.id = id;
        this.dateRecorded = dateRecorded;
        this.value = value;
        this.unit = unit;
    }
}
