import { useState } from 'react';
import RadialTaskSelector, { tasks } from './components/RadialTaskSelector';
import HelpOverlay from './components/HelpOverlay';
import './index.css';

function App() {
    const [currentTask, setCurrentTask] = useState(tasks[0]);

    const resourcesByTask = {
        coding: [
            { icon: '💬', title: 'UIUC Chat Platform', subtitle: 'Explore UIUC-hosted LLMs', url: 'https://uiuc.chat' },
            { icon: '⚙️', title: 'OpenAI API Docs', subtitle: 'Integrate GPT models via API', url: 'https://openai.com/api' },
            { icon: '📚', title: 'HuggingFace Model Hub', subtitle: 'Find open-source coding models', url: 'https://huggingface.co/models' },
        ],
        'analyze data': [
            { icon: '📊', title: 'Pandas Documentation', subtitle: 'Data analysis in Python', url: 'https://pandas.pydata.org/docs/' },
            { icon: '📈', title: 'scikit-learn Guide', subtitle: 'Machine learning in Python', url: 'https://scikit-learn.org/stable/' },
            { icon: '💬', title: 'UIUC Chat Platform', subtitle: 'Experiment with data-focused models', url: 'https://uiuc.chat' },
        ],
        writing: [
            { icon: '✍️', title: 'Grammarly', subtitle: 'Improve your writing', url: 'https://www.grammarly.com/' },
            { icon: '📖', title: 'Hemingway Editor', subtitle: 'Make your writing clear', url: 'https://hemingwayapp.com/' },
            { icon: '💬', title: 'UIUC Chat Platform', subtitle: 'Use LLMs for writing assistance', url: 'https://uiuc.chat' },
        ],
        'evolve idea': [
            { icon: '💡', title: 'MindMeister', subtitle: 'Mind mapping tool', url: 'https://www.mindmeister.com/' },
            { icon: '📝', title: 'Design Thinking Guide', subtitle: 'Methods to develop ideas', url: 'https://designthinking.ideo.com/' },
            { icon: '💬', title: 'UIUC Chat Platform', subtitle: 'Brainstorm with LLMs', url: 'https://uiuc.chat' },
        ],
    };

    const handleTaskChange = task => {
        setCurrentTask(task);
    };

    const resources = resourcesByTask[currentTask] || [];

    return (
        <>
            {/* HEADER */}
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

            {/* GLOBAL HELP OVERLAY */}
            <HelpOverlay />

            {/* APP CONTENT */}
            <div className="app">

                {/* Radial Dial */}
                <RadialTaskSelector onTaskChange={handleTaskChange} />

                {/* RESOURCES SECTION */}
                <div style={{
                    maxWidth: '800px',
                    margin: '40px auto',
                    padding: '0 20px',
                    color: '#000000ff',
                    fontSize: '16px',
                    textAlign: 'left',
                    borderTop: '1px solid #444',
                    paddingTop: '20px'
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        marginBottom: '16px',
                        color: '#000000ff',
                        textAlign: 'center'
                    }}>
                        Learning Resources for {currentTask}
                    </h2>
                    <p style={{
                        marginBottom: '20px',
                        fontSize: '15px',
                        color: '#000000ff',
                        textAlign: 'center'
                    }}>
                        Use this tool to explore Large Language Models (LLMs) by flexibility, precision, and power.
                        Below are resources to help you use and integrate these models into your projects.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {resources.map(resource => (
                            <div key={resource.title}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: '#000000ff',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #333',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                onClick={() => window.open(resource.url, '_blank')}
                            >
                                <div style={{ fontSize: '24px', marginRight: '12px' }}>{resource.icon}</div>
                                <div>
                                    <div style={{
                                        color: '#6ea8ff',
                                        fontWeight: 'bold'
                                    }}>{resource.title}</div>
                                    <div style={{
                                        fontSize: '13px',
                                        color: '#aaa'
                                    }}>{resource.subtitle}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
