// src/components/QuadrantMatrix.jsx
import './QuadrantMatrix.css';

function QuadrantMatrix({ llms }) {
    // Helper to clamp values between 0.05 and 0.95 to avoid clipping at edges
    const clamp = (value, min = 0.05, max = 0.95) => {
        return Math.min(Math.max(value, min), max);
    };

    // Define the order of scores to display in tooltips
    const scoreKeys = ["MMLU", "HumanEval", "BBH", "GSM8K", "TruthfulQA"];

    return (
        <div className="quadrant-container">
            <div className="axis-label flexible">Flexible</div>
            <div className="axis-label precise">Precise</div>
            <div className="axis-label powerful">Powerful</div>
            <div className="axis-label easy">Easy</div>

            {llms
                .filter(llm => llm.name && typeof llm.x === 'number' && typeof llm.y === 'number')
                .map(llm => {
                    const safeX = clamp(llm.x);
                    const safeY = clamp(llm.y);

                    return (
                        <div
                            key={llm.name}
                            className="llm-point"
                            style={{
                                left: `${safeX * 100}%`,
                                top: `${(1 - safeY) * 100}%`,
                            }}
                        >
                            <div className="tooltip">
                                {llm.name}
                                <div className={`tooltiptext ${safeY < 0.3 ? 'flip' : ''}`}>
                                    {scoreKeys.map(key => (
                                        <div key={key}>
                                            <strong>{key}:</strong>{" "}
                                            {llm.scores && llm.scores[key] !== undefined
                                                ? llm.scores[key]
                                                : "N/A"}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default QuadrantMatrix;
