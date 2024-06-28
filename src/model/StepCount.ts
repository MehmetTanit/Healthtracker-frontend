export class StepCount {
    id: number;
    dateRecorded: Date;
    stepCount: number;
    value: number;
    unit: string;

    constructor(
        id: number,
        dateRecorded: Date,
        stepCount: number,
        value: number,
        unit: string
    ) {
        this.id = id;
        this.dateRecorded = dateRecorded;
        this.stepCount = stepCount;
        this.value = value;
        this.unit = unit;
    }
}
