import React from "react";
import { useParams } from "react-router-dom";
import { Entry } from '../types';
import { Icon, Table } from 'semantic-ui-react';

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
                {patient.entries.map((entry: Entry) => (
                    <Table.Body key={entry.id}>
                    <Table.Row>
                        <Table.Cell>
                        {entry.date} {renderSwitchIconHospital(entry.type)}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                        {entry.description}
                        </Table.Cell>
                    </Table.Row>
                    {entry.diagnosisCodes?.map((code) => {
                                const diagnose = props.specificDiagnose(code);
                                return diagnose 
                                    ? <Table.Row key={diagnose.code}>
                                        <Table.Cell>
                                        {diagnose.code} {diagnose.name} {diagnose.latin}
                                        </Table.Cell>
                                        </Table.Row>
                                    : null;
                    })}
                    </Table.Body>
                ))}
                </Table>
            </h2>
        </div>
    );
    
};

export default SinglePatientPage;