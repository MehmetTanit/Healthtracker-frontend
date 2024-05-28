export class HealthMetric {
    id: number;
    userId: number;
    dateRecorded: Date;
    metricType: string;
    value: number;
    unit: string;

    constructor(id: number, userId: number, dateRecorded: Date, metricType: string, value: number, unit: string) {
        this.id = id;
        this.userId = userId;
        this.dateRecorded = dateRecorded;
        this.metricType = metricType;
        this.value = value;
        this.unit = unit;
    }


}
