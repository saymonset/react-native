// Generated by https://quicktype.io

export interface PlanVaccineByDependentResponse {
    result: Result[];
}

export interface Result {
    _id:          ID;
    dependent_id: string;
    vacinne_id:   string;
    status:       boolean;
}

export interface ID {
    $oid: string;
}
