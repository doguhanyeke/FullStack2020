import React from "react";

interface ContentProps {
    courseName: string;
    exerciseCount: number;
}

const Content: React.FC<ContentProps> = (props) => {
    return (
        <div>
            <p>
            {props.courseName} {props.exerciseCount}
            </p> 
        </div>
    );
};

export default Content;