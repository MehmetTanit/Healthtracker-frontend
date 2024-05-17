import { HealthMetric } from "@/model/healthmetric";

export class HeartRate extends HealthMetric {

    constructor(id: number, userId: number, dateRecorded: Date, value: number) {
        super(id, userId, dateRecorded, "HeartRate", value, "bpm");
    }

    getHeartRateValue(): number {
        return this.getValue();
    }

    setHeartRateValue(value: number): void {
        this.setValue(value);
    }
}
