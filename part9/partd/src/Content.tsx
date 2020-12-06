import React from "react";
import Part from "./Part";
import {CoursePart} from "./types"

const Content: React.FC<CoursePart> = (props) => {
    return (
        <Part {...props} />
    );
};

export default Content;