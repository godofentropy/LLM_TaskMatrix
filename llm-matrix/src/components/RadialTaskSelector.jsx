import { useState, useEffect } from 'react';
import llmsData from '../data/llms.json';
import './RadialTaskSelector.css';

const tasks = ["coding", "analyze data", "writing", "evolve idea"];

export default function RadialTaskSelector() {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [filteredLLMs, setFilteredLLMs] = useState([]);

    const currentTask = tasks[currentTaskIndex];

    useEffect(() => {
        // Filter LLMs for current task
        const taskLLMs = llmsData.filter(llm => llm.categories.includes(currentTask));

        // Sort by MMLU or fallback to 0
        const sorted = [...taskLLMs].sort((a, b) => (b.scores.MMLU || 0) - (a.scores.MMLU || 0));

        // Assign suitability tiers
        const total = sorted.length;
        const tierSize = Math.ceil(total / 3);
        const withSuitability = sorted.map((llm, index) => {
            if (index < tierSize) return { ...llm, suitability: "high" };
            if (index < tierSize * 2) return { ...llm, suitability: "medium" };
            return { ...llm, suitability: "low" };
        });

        setFilteredLLMs(withSuitability);
    }, [currentTask]);

    const handleClick = () => {
        setCurrentTaskIndex((currentTaskIndex + 1) % tasks.length);
    };

    const getPosition = (tier, i, total) => {
        const radiusMap = { high: 80, medium: 130, low: 180 };
        const angle = (360 / total) * i;
        const radians = angle * (Math.PI / 180);
        return {
            x: radiusMap[tier] * Math.cos(radians),
            y: radiusMap[tier] * Math.sin(radians),
        };
    };

    return (
        <div className="radial-container">
            {/* Gradient Circles */}
            <div className="circle inner-circle"></div>
            <div className="circle middle-circle"></div>
            <div className="circle outer-circle"></div>

            {/* Center Button */}
            <button className="center-button" onClick={handleClick}>
                {currentTask}
            </button>

            {/* LLM Labels */}
            {filteredLLMs.map((llm, index) => {
                const { x, y } = getPosition(llm.suitability, index, filteredLLMs.length);

                return (
                    <div
                        key={llm.name}
                        className="llm-label tooltip"
                        style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`
                        }}
                    >
                        {llm.name}
                        <div className="tooltiptext">
                            {Object.entries(llm.scores).map(([key, value]) => (
                                <div key={key}>
                                    <strong>{key}:</strong> {value}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
