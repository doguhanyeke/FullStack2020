import React from "react";
import {CoursePart} from "./types"

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part: React.FC<CoursePart> = (props) => {
    switch(props.name) {
        case("Fundamentals"): 
            return (<p>
                Name: {props.name} ExerciseCount: {props.exerciseCount} Description: {props.description}
            </p>);
            break;
        case("Using props to pass data"): 
            return (<p>
                Name: {props.name} ExerciseCount: {props.exerciseCount} Group Project Count: {props.groupProjectCount}
            </p>);
            break;
        case("Deeper type usage"): 
            return (<p>
                Name: {props.name} ExerciseCount: {props.exerciseCount} Exercise Submission Link: {props.exerciseSubmissionLink}
            </p>);
        case("Teacher"):
        return (
            <p>
                Name: {props.name} ExerciseCount: {props.exerciseCount} Description: {props.description} Teacher: {props.teacher}
            </p>
        );
        default:
            return assertNever(props);
    }
}

export default Part