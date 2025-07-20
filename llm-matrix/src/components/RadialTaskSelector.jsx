import { useState } from 'react';
import './RadialTaskSelector.css';
import ReactTooltip from 'react-tooltip';

export default function RadialTaskSelector({ llms }) {
    const taskOrder = ["coding", "analyze data", "writing", "evolve idea"];
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const currentTask = taskOrder[currentTaskIndex];

    const handleClick = () => {
        setCurrentTaskIndex((currentTaskIndex + 1) % taskOrder.length);
    };

    // Filter LLMs for current task
    const relevantLLMs = llms.filter(llm => llm.categories.includes(currentTask));

    // Sort by performance (you can choose which score)
    const sortedLLMs = [...relevantLLMs].sort((a, b) => (b.scores.MMLU || 0) - (a.scores.MMLU || 0));

    // Pick top 3 for simplicity (you can adjust this)
    const topLLMs = sortedLLMs.slice(0, 3);

    return (
        <div className="radial-container">
            <button className="center-button" onClick={handleClick}>
                {currentTask}
            </button>

            {topLLMs.map((llm, index) => (
                <div 
                    key={llm.name} 
                    className={`llm-label llm${index+1}`} 
                    data-tip={`
                        ${llm.name}:
                        MMLU: ${llm.scores.MMLU}
                        HumanEval: ${llm.scores.HumanEval}
                        BBH: ${llm.scores.BBH}
                        GSM8K: ${llm.scores.GSM8K}
                        TruthfulQA: ${llm.scores.TruthfulQA}
                    `}
                >
                    {llm.name}
                </div>
            ))}
            <ReactTooltip multiline={true} effect="solid" />
        </div>
    );
}
