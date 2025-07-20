import { useState, useEffect } from 'react';
import llmsData from '../data/llms.json';
import './RadialTaskSelector.css';

const tasks = ["coding", "analyze data", "writing", "evolve idea"];

export default function RadialTaskSelector() {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [filteredLLMs, setFilteredLLMs] = useState([]);
    const [modalLLM, setModalLLM] = useState(null);

    const currentTask = tasks[currentTaskIndex];

    useEffect(() => {
        const taskLLMs = llmsData.filter(llm => llm.categories.includes(currentTask));
        const sorted = [...taskLLMs].sort((a, b) => (b.scores.MMLU || 0) - (a.scores.MMLU || 0));
        const tierSize = Math.ceil(sorted.length / 3);

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
            {/* Concentric Rings explicitly drawn */}
            <div className="dial-ring high-ring"></div>
            <div className="dial-ring medium-ring"></div>
            <div className="dial-ring low-ring"></div>

            {/* Center Button */}
            <button className="center-button" onClick={handleClick}>
                {currentTask}
            </button>

            {/* Dial markers */}
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
                            onClick={() => setModalLLM(llm)}
                        >
                            <div className="marker-dot"></div>
                            <div className="tooltiptext">
                                <strong>{llm.name}</strong>
                            </div>
                        </div>
                    );
                })
            )}

            {/* Modal */}
            {modalLLM && (
                <div className="modal-overlay" onClick={() => setModalLLM(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>{modalLLM.name}</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {Object.entries(modalLLM.scores).map(([key, value]) => (
                                <li key={key}><strong>{key}:</strong> {value}</li>
                            ))}
                        </ul>
                        <button onClick={() => setModalLLM(null)} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
