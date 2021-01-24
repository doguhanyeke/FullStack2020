import React from "react";
import { useParams } from "react-router-dom";
import { Entry } from '../types';

interface Props {
    specificPatient: Function;
    specificDiagnose: Function;
}

const SinglePatientPage: React.FC<Props> = (props: Props) => {
    const { id } = useParams<{ id: string }>();
    const patient = props.specificPatient(id);
    console.log("bana gelen", patient);
    if (!patient) {
        return null;
    }
    return (
        <div>
            <h1>
                {patient.name} 
            </h1>
            <p>
                {patient.ssn}
            </p>
            <p>
                {patient.occupation}
            </p>
            <h2>
                <p>
                    {"entries"}
                </p>
                <ul>
                {patient.entries.map((entry: Entry) => {
                    return (
                        <div key={entry.id}>
                            <a>
                                {entry.date} {entry.description}
                            </a>
                            {entry.diagnosisCodes?.map((code) => {
                                const diagnose = props.specificDiagnose(code);
                                if (!diagnose) {
                                    return null;
                                }
                                return (
                                    <li key={diagnose.code}>
                                        {diagnose.code} {diagnose.name} {diagnose.latin}
                                    </li>
                                );
                                })}
                        </div>
                    );
                    })}
                </ul>
            </h2>
        </div>
    );
    
};

export default SinglePatientPage;