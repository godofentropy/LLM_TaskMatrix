import { useState } from 'react';

export default function HelpOverlay() {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <>
            <div 
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: '#6ea8ff',
                    color: '#fff',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                    zIndex: 9999
                }}
                onClick={() => setShowHelp(true)}
                title="Help"
            >
                ?
            </div>

            {showHelp && (
                <div style={{
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    width: '300px',
                    height: '100vh',
                    background: '#1a1a1a',
                    color: '#fff',
                    padding: '20px',
                    boxShadow: '-4px 0 10px rgba(0,0,0,0.4)',
                    zIndex: 99999,
                    overflowY: 'auto'
                }}>
                    <h3 style={{ color: '#ff552e' }}>How to Use the AI Task Matrix</h3>
                    <p>This tool helps you find the best AI model for your task.</p>
                    <ol>
                        <li><b>Select</b> task by clicking the orange center button.</li>
                        <li><b>Interpret the dial:</b> Inner dots = better for the task.</li>
                        <li><b>Hover</b> on a dot to see the model name.</li>
                        <li><b>Click</b> a dot to view detailed performance in the right panel.</li>
                    </ol>
                    <button 
                        style={{
                            marginTop: '20px',
                            background: '#ff552e',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                        onClick={() => setShowHelp(false)}
                    >
                        Close
                    </button>
                </div>
            )}
        </>
    );
}
