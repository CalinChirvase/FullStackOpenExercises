import React from 'react';
import Part from './Part';
import { CoursePart } from '../types'

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map((part: CoursePart) => 
            <Part part={part} key={part.name}/>)}
        </div>
    );
};

export default Content;