import { useState } from 'react';
import './RadialTaskSelector.css';

const taskMap = {
    Writing: [
        { name: "Claude 3", scores: { Precision: 9.7, Creativity: 9.8 } },
        { name: "GPT-4.5", scores: { Precision: 9.6, Creativity: 9.5 } },
        { name: "Gemini", scores: { Precision: 9.2, Creativity: 9.3 } }
    ],
    Coding: [
        { name: "StarCoder", scores: { Precision: 8.5, Autonomy: 9.0 } },
        { name: "GPT-4.5", scores: { Precision: 9.0, Autonomy: 8.7 } },
        { name: "DeepSeek", scores: { Precision: 8.0, Autonomy: 8.5 } }
    ],
    "Data Analysis": [
        { name: "Gemini", scores: { Interpretability: 9.0, Accuracy: 9.3 } },
        { name: "DeepSeek", scores: { Interpretability: 8.8, Accuracy: 9.1 } },
        { name: "GPT-4.5", scores: { Interpretability: 8.9, Accuracy: 9.0 } }
    ],
    "Idea Evolution": [
        { name: "Claude 3", scores: { Flexibility: 9.6, Coherence: 9.4 } },
        { name: "Gemini", scores: { Flexibility: 9.3, Coherence: 9.1 } },
        { name: "Vicuna", scores: { Flexibility: 8.5, Coherence: 8.7 } }
    ]
};

const taskOrder = ["Writing", "Coding", "Data Analysis", "Idea Evolution"];

const scoreKeysMap = {
    Writing: ["Precision", "Creativity"],
    Coding: ["Precision", "Autonomy"],
    "Data Analysis": ["Interpretability", "Accuracy"],
    "Idea Evolution": ["Flexibility", "Coherence"]
};

export default function RadialTaskSelector() {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const currentTask = taskOrder[currentTaskIndex];
    const llms = taskMap[currentTask];
    const scoreKeys = scoreKeysMap[currentTask];

    const handleClick = () => {
        setCurrentTaskIndex((currentTaskIndex + 1) % taskOrder.length);
    };

    return (
        <div className="radial-container">
            <button className="center-button" onClick={handleClick}>
                {currentTask}
            </button>

            {llms.map((llm, index) => (
                <div key={llm.name} className={`llm-label llm${index + 1}`}>
                    <div className="tooltip">
                        {llm.name}
                        <div className="tooltiptext">
                            {scoreKeys.map(key => (
                                <div key={key}>
                                    <strong>{key}:</strong>{" "}
                                    {llm.scores?.[key] !== undefined ? llm.scores[key] : "N/A"}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
