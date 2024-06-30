// src/model/Weight.ts
export class Weight {
    id: number;
    dateRecorded: Date;
    weight: number;
    unit: string;

    constructor(id: number, dateRecorded: Date, weight: number, unit: string) {
        this.id = id;
        this.dateRecorded = dateRecorded;
        this.weight = weight;
        this.unit = unit;
    }
}
