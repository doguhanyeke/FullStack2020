/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Gender, NewPatient, Entry, HospitalEntry, OccupationalHealthCareEntry, HealthCheckEntry, HealthCheckRating } from './types';
import { v4 as uuid } from 'uuid';


const isDate = (obj: any): boolean => {
    return Boolean(Date.parse(obj));
};

const parseDate = (obj: any): string => {
    if(!obj || !isString(obj) || !isDate(obj)){
        throw new Error("Date is not formed well'");
    }
    return obj;
};

const isGender = (obj: any): boolean => {
    return Object.values(Gender).includes(obj);
};

const parseGender = (obj: any): Gender => {
    if(!obj || !isGender(obj)){
        throw new Error("Gender is not formed well!");
    }
    return obj;
};

const isString = (obj: any): boolean => {
    return typeof obj === "string" || obj instanceof String;
};

const parseString = (obj: any): string => {
    if(!obj || !isString(obj)) {
        throw new Error("Object is not String!");
    }
    return obj;
};

const parseArray = (obj: any): Entry[] => {
    return obj;
};

const isHealthCheckRating = (obj: any): boolean => {
    console.log("values", Object.values(HealthCheckRating));
    return Object.values(HealthCheckRating).includes(obj);
};

const parseHealthCheckRating = (obj: any): HealthCheckRating => {
    console.log("gelen", obj);
    if(obj !== null && !isHealthCheckRating(obj)){
        console.log("aman");
        throw new Error("HealthCheckRating is not formed well!");
    }
    console.log("normal");
    return obj;
};

type HospitalType = "Hospital";
function parseHospitalString(obj: any, type: string): HospitalType {
    try {
        console.log("dogu");
        if (obj === type) {
            return obj;
        }
        console.log("noo");
        throw new Error("Object is not Hospital!");
    } catch (e) {
        console.log("noo2");
        throw new Error("Object is not String!");
    }
}

const parseHospital = (obj: any): HospitalEntry => {
    return {
        id: parseString(obj.id),
        description: parseString(obj.description),
        date: parseString(obj.date),
        specialist: parseString(obj.specialist),
        type: parseHospitalString(obj.type, "Hospital"),
        discharge: {
            date: parseString(obj.discharge.date),
            criteria: parseString(obj.discharge.criteria)
        }
    };
};

type OccupationalHealthcareType = "OccupationalHealthcare";
function parseOccupationalHealthcareString(obj: any, type: string): OccupationalHealthcareType {
    try {
        if (obj === type) {
            return obj;
        }
        throw new Error("Object is not OccupationalHealthcare!");
    } catch (e) {
        throw new Error("Object is not String!");
    }
}

const parseOccupationalHealthcare = (obj: any): OccupationalHealthCareEntry => {
    return {
        id: parseString(obj.id),
        description: parseString(obj.description),
        date: parseString(obj.date),
        specialist: parseString(obj.specialist),
        type: parseOccupationalHealthcareString(obj.type, "OccupationalHealthcare"),
        employerName: parseString(obj.employerName)
    };
};

type HealthCheckType = "HealthCheck";
function parseHealthCheckString(obj: any, type: string): HealthCheckType {
    try {
        if (obj === type) {
            console.log("yehu");
            return obj;
        }
        console.log("what");
        throw new Error("Object is not HealthCheck!");
    } catch (e) {
        throw new Error("Object is not String!");
    }
}

const parseHealthCheck = (obj: any): HealthCheckEntry => {
    console.log("yes");
    return {
        id: parseString(obj.id),
        description: parseString(obj.description),
        date: parseString(obj.date),
        specialist: parseString(obj.specialist),
        type: parseHealthCheckString(obj.type, "HealthCheck"),
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toPatient = (object: any): NewPatient => {
    return {
        name: parseString(object.name),
        ssn: parseString(object.ssn),
        occupation: parseString(object.occupation),
        gender: parseGender(object.gender),
        dateOfBirth: parseDate(object.dateOfBirth),
        entries: parseArray(object.entries)
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toEntry = (object: any): Entry => {
    if (object.type) {
        if (object.type === "Hospital") {
            console.log("hospital");
            return parseHospital(object);
        }
        else if (object.type === "OccupationalHealthcare") {
            return parseOccupationalHealthcare(object);
        }
        else if (object.type === "HealthCheck") {
            return parseHealthCheck(object);
        }
        throw new Error("Error in toEntry function");
    }
    throw new Error("Error in toEntry function");
};

export const generateUniqueID = (): string => {
    const id: string = uuid();
    if(!id || !isString(id)) {
        throw new Error("Object is not String!");
    }
    return id;
};
 
export default toPatient;