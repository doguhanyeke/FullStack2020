export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export type Gender = "male" | "female" | "other";

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    ssn: string
    occupation: string
}

