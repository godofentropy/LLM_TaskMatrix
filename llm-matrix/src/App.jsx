import RadialTaskSelector from './components/RadialTaskSelector';
import './index.css';

function App() {
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

            {/* APP CONTENT */}
            <div className="app">

                {/* How to Use Section */}
                <div style={{
                    maxWidth: '600px',
                    margin: '30px auto',
                    padding: '20px',
                    background: '#f9f9f9',
                    borderRadius: '12px',
                    boxShadow: '0 0 12px rgba(0,0,0,0.05)',
                    color: '#222',
                    textAlign: 'center',
                    fontSize: '15px'
                }}>
                    <h2 style={{ marginBottom: '12px', color: '#ff552e' }}>📘 How to Use the AI Task Matrix</h2>
                    <p>This tool helps you find the best AI model for your task.</p>
                    <ol style={{ textAlign: 'left', margin: '10px auto', maxWidth: '400px' }}>
                        <li><strong>Select your task</strong> by clicking the orange center button.</li>
                        <li><strong>Read the dial:</strong> Inner dots = better for the task. Outer dots = generalists.</li>
                        <li><strong>Hover</strong> on a dot to see the model name.</li>
                        <li><strong>Click</strong> a dot to view detailed performance in the right panel.</li>
                    </ol>
                </div>

                {/* Radial Dial */}
                <RadialTaskSelector />

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
                        Learning Resources
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

                    {/* RESOURCE CARDS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            {
                                icon: '💬',
                                title: 'UIUC Chat Platform',
                                subtitle: 'Explore UIUC-hosted LLMs',
                                url: 'https://uiuc.chat'
                            },
                            {
                                icon: '📚',
                                title: 'HuggingFace Model Hub',
                                subtitle: 'Find and compare open LLM models',
                                url: 'https://huggingface.co/models'
                            },
                            {
                                icon: '⚙️',
                                title: 'OpenAI API Docs',
                                subtitle: 'Integrate GPT models via API',
                                url: 'https://openai.com/api'
                            },
                            {
                                icon: '📄',
                                title: 'Anthropic API Docs',
                                subtitle: 'Integrate Claude models via API',
                                url: 'https://platform.anthropic.com/docs'
                            },
                        ].map(resource => (
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
