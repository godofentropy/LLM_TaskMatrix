import { useState } from 'react';
import RadialTaskSelector from './components/RadialTaskSelector';
import HelpOverlay from './components/HelpOverlay';
import ResourcesPanel from './components/ResourcesPanel';
import './index.css';

const tasks = ["Coding", "Analyze Data", "Writing", "Evolve an Idea"];

function App() {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const currentTask = tasks[currentTaskIndex];

    const handleNextTask = () => {
        setCurrentTaskIndex((prev) => (prev + 1) % tasks.length);
    };

    return (
        <>
            <header style={{
                width: '100vw',
                backgroundColor: '#13294b',
                padding: '12px 0',
                borderBottom: '4px solid #ff552e',
                margin: '0',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>
                    <img
                        src="https://illinois.edu/assets/img/branding/illinois_primary_wordmark_reversed_orange.svg"
                        alt="Illinois Logo"
                        style={{ height: '28px', marginRight: '10px' }}
                    />
                    AI Task Matrix
                </div>
            </header>

            <HelpOverlay />

            <div className="app">
                <RadialTaskSelector task={currentTask} onNextTask={handleNextTask} />
                <ResourcesPanel task={currentTask} />
            </div>
        </>
    );
}

export default App;
