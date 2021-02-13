// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartsDescription extends CoursePartBase {
    description: string;
}
  
interface CoursePartOne extends CoursePartsDescription {
    name: "Fundamentals";
}
  
interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}
  
interface CoursePartThree extends CoursePartsDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartsDescription {
    name: "My custom course";
    riddle: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;