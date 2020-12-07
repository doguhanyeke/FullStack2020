import React from "react";
import {Patient} from "../types";

const SinglePatientPage: React.FC<Patient | {} > = (props: Patient | {}) => {
    return (
        <div>
            <h1>
                {props}
            </h1>
        </div>
    );
};

export default SinglePatientPage;