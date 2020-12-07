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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry{
}

export interface NewPatient {
    name: string,
    dateOfBirth: string,
    gender: Gender,
    ssn: string
    occupation: string
    entries: Entry[]
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    ssn: string,
    occupation: string,
    entries: Entry[]
}

export type PublicPatient = Omit< Patient, "ssn" | "entries" >;
