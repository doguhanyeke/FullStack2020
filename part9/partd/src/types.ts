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

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyCoursePart;
