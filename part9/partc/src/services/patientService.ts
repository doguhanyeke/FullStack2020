import patientData from '../data/patients.json';
import { Patient, NewPatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Omit<Patient, "ssn">[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (obj: NewPatient): Patient => {
    const newPatient: Patient = {
        id: "d2773336-f723-11e9-8f0b-362b9e155667",
        dateOfBirth: obj.dateOfBirth,
        name: obj.name,
        ssn: obj.ssn,
        gender: obj.gender,
        occupation: obj.occupation
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient
};