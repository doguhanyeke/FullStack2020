import React from "react";
import ReactDOM from "react-dom";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      {courseParts.map(part =>
        <Content key={part.name}
        courseName={part.name}
        exerciseCount={part.exerciseCount}/>
      )}
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));