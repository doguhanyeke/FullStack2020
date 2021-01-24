/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Gender, NewPatient, Entry } from './types';

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

export default toPatient;