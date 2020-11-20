import diagnoseData from '../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>; 

const getDiagnoseData = (): Diagnose[] => {
    return diagnoses;
};

export default {
    getDiagnoseData
};