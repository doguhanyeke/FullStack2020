import React from "react";
import { useParams } from "react-router-dom";
import { Entry } from '../types';
import { Icon, Table } from 'semantic-ui-react'

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

    const renderSwitchIcon = (param: string) => {
        switch(param) {
            case 'male':
                return (
                    <Icon name='mars' />
                );
            case 'female':
                return (
                    <Icon name='venus' />
                );
            default:
                return null;
        }
    };

    const renderSwitchIconHospital = (param: string) => {
        switch(param) {
            case 'OccupationalHealthcare':
                return (
                    <Icon name='hospital outline' />
                );
            case 'Hospital':
                return (
                    <Icon name='hospital' />
                );
            case 'HealthCheck':
                return (
                    <Icon name='heartbeat' />
                );
            default:
                return null;
        }
    };
    return (
        <div>
            <h1>
                {patient.name} 
                {renderSwitchIcon(patient.gender)}
            </h1>
            <p>
                {`ssn: ${patient.ssn}`}
            </p>
            <p>
                {`occupation: ${patient.occupation}`}
            </p>
            <h2>
                <p>
                    {"Entries"}
                </p>
                <Table striped>
                <Table.Body>
                {patient.entries.map((entry: Entry) => (
                    <Table.Row key={entry.id}>
                    <Table.Row>{entry.date}{renderSwitchIconHospital(entry.type)}</Table.Row>
                    <Table.Row>{entry.description}</Table.Row>
                    {entry.diagnosisCodes?.map((code) => {
                                const diagnose = props.specificDiagnose(code);
                                if (!diagnose) {
                                    return null;
                                }
                                return (
                                    <Table.Row>
                                        {diagnose.code} {diagnose.name} {diagnose.latin}
                                    </Table.Row>
                                );
                                })}
                    </Table.Row>
                ))}
                </Table.Body>
                </Table>
            </h2>
        </div>
    );
    
};

export default SinglePatientPage;