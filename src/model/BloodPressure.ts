export class BloodPressure {
    id: number;
    dateRecorded: Date;
    systolicPressure: number;
    diastolicPressure: number;
    value: number;
    unit: string;

    constructor(
        id: number,
        dateRecorded: Date,
        systolicPressure: number,
        diastolicPressure: number,
        value: number,
        unit: string
    ) {
        this.id = id;
        this.dateRecorded = dateRecorded;
        this.systolicPressure = systolicPressure;
        this.diastolicPressure = diastolicPressure;
        this.value = value;
        this.unit = unit;
    }
}
