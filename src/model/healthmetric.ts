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

    // Getter und Setter Methoden
    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getUserId(): number {
        return this.userId;
    }

    setUserId(userId: number): void {
        this.userId = userId;
    }

    getDateRecorded(): Date {
        return this.dateRecorded;
    }

    setDateRecorded(dateRecorded: Date): void {
        this.dateRecorded = dateRecorded;
    }

    getMetricType(): string {
        return this.metricType;
    }

    setMetricType(metricType: string): void {
        this.metricType = metricType;
    }

    getValue(): number {
        return this.value;
    }

    setValue(value: number): void {
        this.value = value;
    }

    getUnit(): string {
        return this.unit;
    }

    setUnit(unit: string): void {
        this.unit = unit;
    }
}
