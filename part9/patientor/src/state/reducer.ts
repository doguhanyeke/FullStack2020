import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Array<Diagnosis>;
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        entry: Entry;
        patientId: string;
      };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({...memo, [diagnose.code]: diagnose}),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      let patientToBeUpdated: Patient;
      Object.values(state.patients).forEach(patient => {
        if (patient.id === action.payload.patientId) {
          patient.entries.push(action.payload.entry);
          patientToBeUpdated = patient;
          console.log("new patient", patientToBeUpdated, action.payload.entry);
          if(!patientToBeUpdated) {
            return state;
          }
          return {
            ...state,
            patients: {
              ...state.patients,
              [action.payload.patientId]: patientToBeUpdated
              }
            };
        }
      });
      return state;
      
    default:
      return state;
  }
};
