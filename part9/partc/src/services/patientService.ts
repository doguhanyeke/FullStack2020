// import patientData from '../data/patients.json';
import patientData from '../data/patients';
import { Patient, NewPatient, Entry, PublicPatient } from '../types';
import { generateUniqueID } from '../utils';

export let patients: Array<Patient> = patientData;

const getPatients = (): Omit<Patient, "ssn">[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = (obj: NewPatient): Patient => {
    const newPatient: Patient = {
        id: generateUniqueID(),
        dateOfBirth: obj.dateOfBirth,
        name: obj.name,
        ssn: obj.ssn,
        gender: obj.gender,
        occupation: obj.occupation,
        entries: []
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntryToPatient = (obj: Patient, entry: Entry): PublicPatient => {
    obj.entries.push(entry);
    patients = patients.map(patient => patient.id === obj.id ? obj : patient);
    return obj;
};

export default {
    getPatients,
    addPatient,
    addEntryToPatient
};