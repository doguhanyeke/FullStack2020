import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryType } from "./FormField";
import { HospitalEntry } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = HospitalEntry;
// id: string;
// description: string;
// date: string;
// specialist: string;
// diagnosisCodes?: Array<Diagnosis['code']>;
// type: "Hospital";
// discharge: {
//   date: string;
//   criteria: string;
// };

export const EntryOptions: Array<EntryType> = [
  {value: "Hospital", label: "hospital"},
  {value: "OccupationalHealthCare", label: "occupationalHealthCare"},
  {value: "HealthCheck", label: "healthCheck"}
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  // const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        id: "",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "Hospital",
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.id) {
          errors.id = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.discharge) {
          if(!("date" in values.discharge)){
            errors.discharge = requiredError;  
          }
          if(!("criteria" in values.discharge)){
            errors.discharge = requiredError;  
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        console.log(isValid, dirty, "asd");
        return (
          <Form className="form ui">
            <Field
              label="Id"
              placeholder="Id"
              name="id"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Diagnosis Codes"
              placeholder="Diagnosis Codes"
              name="diagnosisCodes"
              component={TextField}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <SelectField
              label="Type"
              name="type"
              options={EntryOptions}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
