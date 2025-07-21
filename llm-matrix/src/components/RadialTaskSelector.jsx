import { useState, useEffect } from 'react';
import llmsData from '../data/llms.json';
import './RadialTaskSelector.css';

export default function RadialTaskSelector({ task, onNextTask }) {
    const [filteredLLMs, setFilteredLLMs] = useState([]);
    const [selectedLLM, setSelectedLLM] = useState(null);

    useEffect(() => {
        const taskLLMs = llmsData.filter(llm => llm.categories.includes(task));
        const sorted = [...taskLLMs].sort((a, b) => (b.scores.MMLU || 0) - (a.scores.MMLU || 0));
        const tierSize = Math.ceil(sorted.length / 3);

        const withSuitability = sorted.map((llm, index) => {
            if (index < tierSize) return { ...llm, suitability: "high" };
            if (index < tierSize * 2) return { ...llm, suitability: "medium" };
            return { ...llm, suitability: "low" };
        });

        setFilteredLLMs(withSuitability);
    }, [task]);

    const tiers = {
        high: filteredLLMs.filter(llm => llm.suitability === "high"),
        medium: filteredLLMs.filter(llm => llm.suitability === "medium"),
        low: filteredLLMs.filter(llm => llm.suitability === "low"),
    };

    const radiusMap = { high: 80, medium: 130, low: 180 };
    const arcMap = {
        high: { start: 300, end: 60 },
        medium: { start: 120, end: 240 },
        low: { start: 240, end: 360 },
    };

    const getArcAngle = (start, end, index, total) => {
        const adjustedEnd = end < start ? end + 360 : end;
        const angleSpan = adjustedEnd - start;
        return (start + (angleSpan / total) * index) % 360;
    };

    return (
        <div className="radial-container">
            <div className="dial-ring high-ring"></div>
            <div className="dial-ring medium-ring"></div>
            <div className="dial-ring low-ring"></div>

            <button className="center-button" onClick={onNextTask}>
                {task}
            </button>

            {Object.entries(tiers).map(([tier, llms]) =>
                llms.map((llm, i) => {
                    const { start, end } = arcMap[tier];
                    const angle = getArcAngle(start, end, i, llms.length);
                    const radians = angle * (Math.PI / 180);
                    const jitter = Math.random() * 6 - 3;

                    const x = (radiusMap[tier] + jitter) * Math.cos(radians);
                    const y = (radiusMap[tier] + jitter) * Math.sin(radians);

                    return (
                        <div
                            key={llm.name}
                            className={`llm-marker tooltip ${tier}`}
                            style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`
                            }}
                            onClick={() => setSelectedLLM(llm)}
                        >
                            <div className="marker-dot"></div>
                            <div className="tooltiptext">
                                <strong>{llm.name}</strong>
                            </div>
                        </div>
                    );
                })
            )}

            {selectedLLM && (
                <div className="side-panel">
                    <div className="side-panel-header">
                        <h3>{selectedLLM.name}</h3>
                        <button 
                            className="close-btn"
                            onClick={() => setSelectedLLM(null)}
                        >✕</button>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {Object.entries(selectedLLM.scores).map(([key, value]) => (
                            <li key={key}><strong>{key}:</strong> {value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
