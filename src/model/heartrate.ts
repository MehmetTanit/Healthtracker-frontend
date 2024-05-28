import { HealthMetric } from "@/model/healthmetric";

export class HeartRate extends HealthMetric {

    constructor(id: number, userId: number, dateRecorded: Date, value: number) {
        super(id, userId, dateRecorded, "HeartRate", value, "bpm");
    }

}
