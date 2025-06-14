// src/App.jsx
import { useState } from 'react';
import QuadrantMatrix from './components/QuadrantMatrix';
import llmsData from './data/llms.json';
import './index.css';
import Select from 'react-select';

function App() {
    const [selectedCategory, setSelectedCategory] = useState('');

    // All unique categories
    const allCategories = Array.from(new Set(llmsData.flatMap(llm => llm.categories)));

    // Filter LLMs
    const filteredLLMs = selectedCategory
        ? llmsData.filter(llm => llm.categories.includes(selectedCategory))
        : llmsData;

    const categoryOptions = [
        { value: '', label: 'All' },
        ...allCategories.map(category => ({ value: category, label: category })),
    ];

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
                {/* Dropdown */}
                <div className="dropdown" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '20px',
                    gap: '10px'
                }}>
                    <span style={{ color: '#f0f0f0', fontSize: '16px', fontWeight: '500' }}>
                        What are you looking to do?
                    </span>
                    <div
                        style={{
                            display: 'inline-block',
                            borderRadius: '12px',
                            boxShadow: '0 0 6px 3px rgba(132, 63, 255, 0.3)',
                            padding: '4px',
                            transition: 'box-shadow 0.3s ease-in-out',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = '0 0 18px 8px rgba(138, 43, 226, 0.8)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = '0 0 12px 4px rgba(138, 43, 226, 0.6)';
                        }}
                    >
                        <Select
                            classNamePrefix="Select"
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            value={categoryOptions.find(option => option.value === selectedCategory)}
                            onChange={(selectedOption) => setSelectedCategory(selectedOption.value)}
                            options={categoryOptions}
                            styles={{
                                container: (base) => ({
                                    ...base,
                                    minWidth: '250px',
                                    maxWidth: '300px',
                                    zIndex: 1000, // optional extra
                                }),
                                control: (base, state) => ({
                                    ...base,
                                    backgroundColor: '#2c2c2c',
                                    color: '#f0f0f0',
                                    borderRadius: '8px',
                                    border: state.isFocused ? '1px solid #6ea8ff' : '1px solid #555',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        border: '1px solid #6ea8ff',
                                    },
                                }),
                                singleValue: (base) => ({ ...base, color: '#f0f0f0' }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: '#2c2c2c',
                                    color: '#f0f0f0',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    zIndex: 9999,
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused
                                        ? '#444'
                                        : '#2c2c2c',
                                    color: '#f0f0f0',
                                    cursor: 'pointer',
                                    '&:active': {
                                        backgroundColor: '#555',
                                    },
                                }),
                            }}
                        />
                    </div>
                </div>

                {/* Quadrant */}
                <QuadrantMatrix llms={filteredLLMs} />

                {/* RESOURCES SECTION */}
                <div style={{
                    maxWidth: '800px',
                    margin: '40px auto',
                    padding: '0 20px',
                    color: '#f0f0f0',
                    fontSize: '16px',
                    textAlign: 'left',
                    borderTop: '1px solid #444',
                    paddingTop: '20px'
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        marginBottom: '16px',
                        color: '#f0f0f0',
                        textAlign: 'center'
                    }}>
                        Learning Resources
                    </h2>
                    <p style={{
                        marginBottom: '20px',
                        fontSize: '15px',
                        color: '#cccccc',
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
                                    background: '#2c2c2c',
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
