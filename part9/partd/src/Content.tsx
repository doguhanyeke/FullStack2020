import React from "react";
import Part from "./Part";

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

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

const Content: React.FC<CoursePart> = (props) => {
    return (
        <Part {...props} />
    );
};

export default Content;