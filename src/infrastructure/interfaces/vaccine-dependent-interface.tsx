// Generated by https://quicktype.io

export interface VaccineDependentResponse {
    desde:    number;
    limite:   number;
    total:    number;
    vaccines: VaccineResponse[];
}

export interface VaccineResponse {
    _id:              ID;
    application_age:  string;
    description:      string;
    disease_prevents: string;
    isAlertApply:     boolean;
    isChildren:       boolean;
    name:             string;
    status:           boolean;
}



export interface ID {
    $oid: string;
}
