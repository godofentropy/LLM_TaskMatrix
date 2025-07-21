import RadialTaskSelector from './components/RadialTaskSelector';
import HelpOverlay from './components/HelpOverlay';
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

            {/* GLOBAL HELP OVERLAY */}
            <HelpOverlay />

            {/* APP CONTENT */}
            <div className="app">

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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[{
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
                        }].map(resource => (
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
