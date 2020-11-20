import diagnoseData from '../data/diagnoses.json';
import { Diagnose } from '../types';

const getDiagnoseData = (): Diagnose[] => {
    return diagnoseData;
};

export default {
    getDiagnoseData
};