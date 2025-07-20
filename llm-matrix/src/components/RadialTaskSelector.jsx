import { useState } from 'react';
import './RadialTaskSelector.css';

const taskMap = {
    Writing: ["Claude 3", "GPT-4.5", "Gemini"],
    Coding: ["StarCoder", "GPT-4.5", "DeepSeek"],
    "Data Analysis": ["Gemini", "DeepSeek", "GPT-4.5"],
    "Idea Evolution": ["Claude 3", "Gemini", "Vicuna"]
};

const taskOrder = ["Writing", "Coding", "Data Analysis", "Idea Evolution"];

export default function RadialTaskSelector() {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const currentTask = taskOrder[currentTaskIndex];
    const llms = taskMap[currentTask];

    const handleClick = () => {
        setCurrentTaskIndex((currentTaskIndex + 1) % taskOrder.length);
    };

    return (
        <div className="radial-container">
            <button className="center-button" onClick={handleClick}>
                {currentTask}
            </button>
            <div className="llm-label llm1">{llms[0]}</div>
            <div className="llm-label llm2">{llms[1]}</div>
            <div className="llm-label llm3">{llms[2]}</div>
        </div>
    );
}
