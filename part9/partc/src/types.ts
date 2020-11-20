export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other" 
}

export interface NewPatient {
    name: string,
    dateOfBirth: string,
    gender: Gender,
    ssn: string
    occupation: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    ssn: string
    occupation: string
}

