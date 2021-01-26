import React from "react";
import { useParams } from "react-router-dom";
import { Entry } from '../types';
import { Button, Icon, Table } from 'semantic-ui-react';
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import AddEntryModal from "../AddEntryModal";
import { useStateValue } from "../state";

interface Props {
    specificPatient: Function;
    specificDiagnose: Function;
}

const SinglePatientPage: React.FC<Props> = (props: Props) => {
    const [state, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

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

    
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
        const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
        );
        console.log("data ne", newEntry);
        dispatch({ type: "ADD_ENTRY", payload: { patientId: id, entry: newEntry}});
        closeModal();
        } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
        }
    };

    return (
        <div>
            <h1>
                {patient.name} 
                {renderSwitchIcon(patient.gender)}
            </h1>
            <p>
                {`Ssn: ${patient.ssn}`}
            </p>
            <p>
                {`Occupation: ${patient.occupation}`}
            </p>
            <h2>
                <p>
                    {"Patient Entries"}
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
            <AddEntryModal 
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add Entry</Button>
        </div>
    );
    
};

export default SinglePatientPage;