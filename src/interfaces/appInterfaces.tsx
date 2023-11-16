


export interface MenuItem {
    name: string;
    icon: string;
    component: string;
}

// Generated by https://quicktype.io
export interface LoginData {
    email:   string;
    password: string;
}

export interface RegisterData {
    email:   string;
    password: string;
    nombre:   string;
}


export interface LoginResponse {
    usuario: Usuario;
    token:   string;
}

export interface Usuario {
    rol?:    string;
    estado?: boolean;
    google?: boolean;
    nombre?: string;
    uid?:    string;
    img?:   string;

    name?:      string;
    lastname?:  string;
    password?:  string;
    ci?:        string;
    email?:     string;
    state?:     string;// Generated by https://quicktype.io
    city?:      string;
    birth?:     string;
    gender_id?: string;
    status?:    string;
    token?:     string;
}

 

export interface UserResponse {
    error?: string;
    resp?:  boolean;
    message?: string;
}