import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, useParams } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import SinglePatientPage from "./SinglePatientPage";

const App: React.FC = () => {
  const [{patients}, dispatch] = useStateValue();
  // const {id} = useParams<{ id: string }>();

  React.useEffect(() => {

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);
  
  const id = "d2773336-f723-11e9-8f0b-362b9e155667";

  function specificPatient(): Patient | null {
    if (id){
      console.log("id");
      console.log(JSON.stringify(patients[id]));
      return patients[id];  
    } else {
      return null;
    }
  }

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            {specificPatient() && <Route path="/:id" render={() => <SinglePatientPage {...specificPatient() } />} />}
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
