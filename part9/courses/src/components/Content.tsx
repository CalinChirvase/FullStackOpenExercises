import React from 'react';
import { CoursePart } from '../types'

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map((part: CoursePart) => 
            <p key={part.name}>{part.name} {part.exerciseCount}</p>)}
        </div>
    );
};

export default Content;