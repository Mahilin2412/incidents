import { Time } from "@angular/common";
import { Timestamp } from "rxjs";

export interface Service {
    Id_service?: number;
    incident_log_id?: number;
    fallo?: string;
    Id_operation?: number;
    start_dates?: Date;
    end_date?: Date;
    comments?: string;
}