// Generated by https://quicktype.io

export interface ApplyVaccineResponse {
    vacc_apply_vaccines: VaccApplyVaccine[];
    statusCode:          number;
    resp:                boolean;
}

export interface VaccApplyVaccine {
    dependent?: Dependent;
    vaccine?:   Vaccine;
    dosis?:     Dosi[];
}

export interface Dependent {
    _id:        ID;
    name:       string;
    lastname:   string;
    email:      string;
    birth:      string;
    gender_id:  string;
    status:     boolean;
    token:      string;
    phone:      string;
    isUser:     boolean;
    user_id:    ID;
    isChildren: boolean;
    age:        number;
    days_birth: number;
}

export interface ID {
    $oid: string;
}

export interface Dosi {
    _id:              ID;
    vacinne_id:       string;
    name:             string;
    age_frequency:    string;
    status:           boolean;
    columReporte:     string;
    rowReporte:       string;
    expires_in_days:  number;
    isApplied:        boolean;
    lote:             null;
    image:            null;
    vaccination_date: null;
    dependentId:      string;
    dosisId:          string;
}

export interface Vaccine {
    _id:              ID;
    name:             string;
    description:      string;
    disease_prevents: string;
    application_age:  string;
    isChildren:       boolean;
    status:           boolean;
}

// Generated by https://quicktype.io

export interface ApplyVaccineCreateResponse {
    dosis_id?:         string;
    dependent_id?:     string;
    lote?:             string;
    image?:            string;
    vaccination_date?:    Date | null; 
    status?:           boolean;
    statusCode?:       number;
    resp?:             boolean;
}

// // Generated by https://quicktype.io

// export interface ApplyVaccineCreate {
//     _id? :            ID;
//     dosis_id:         string;
//     dependent_id:     string;
//     lote:             string;
//     vaccination_date: string;
//     image:            string;
//     status:           boolean;
// }
