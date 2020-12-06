import React from "react";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBase2 extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartBase2 {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase2 {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface MyCoursePart extends CoursePartBase2 {
    name: "Teacher"
    teacher: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyCoursePart;

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