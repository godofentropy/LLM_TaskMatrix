import { useState, useEffect } from 'react';

export default function ResourcesPanel({ task }) {
    const [arxivPapers, setArxivPapers] = useState([]);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!task) return;

        setLoading(true);

        const fetchArxiv = async () => {
            const query = encodeURIComponent(`LLM ${task}`);
            const url = `https://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=4`;

            const response = await fetch(url);
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, "text/xml");

            const entries = Array.from(xml.getElementsByTagName("entry")).map(entry => ({
                title: entry.getElementsByTagName("title")[0].textContent.trim(),
                link: entry.getElementsByTagName("id")[0].textContent.trim()
            }));

            setArxivPapers(entries);
        };

        const fetchHuggingFace = async () => {
            const url = `https://huggingface.co/api/models?search=${encodeURIComponent(task)}`;

            const response = await fetch(url);
            const modelsData = await response.json();

            setModels(modelsData.slice(0, 4).map(model => ({
                name: model.modelId,
                link: `https://huggingface.co/${model.modelId}`
            })));
        };

        Promise.all([fetchArxiv(), fetchHuggingFace()])
            .then(() => setLoading(false))
            .catch(() => setLoading(false));

    }, [task]);

    return (
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
                {loading ? "Loading Resources..." : `Learning Resources: ${task}`}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Arxiv Papers */}
                {arxivPapers.length > 0 && (
                    <>
                        <h3>📄 Latest Papers (ArXiv)</h3>
                        {arxivPapers.map(paper => (
                            <div key={paper.link}
                                style={{
                                    background: '#000000ff',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #333',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onClick={() => window.open(paper.link, '_blank')}
                            >
                                <div style={{ color: '#6ea8ff', fontWeight: 'bold' }}>{paper.title}</div>
                            </div>
                        ))}
                    </>
                )}

                {/* HuggingFace Models */}
                {models.length > 0 && (
                    <>
                        <h3>🤖 HuggingFace Models</h3>
                        {models.map(model => (
                            <div key={model.link}
                                style={{
                                    background: '#000000ff',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #333',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onClick={() => window.open(model.link, '_blank')}
                            >
                                <div style={{ color: '#6ea8ff', fontWeight: 'bold' }}>{model.name}</div>
                            </div>
                        ))}
                    </>
                )}

                {/* Fallback if no resources found */}
                {(!loading && arxivPapers.length === 0 && models.length === 0) && (
                    <p>No resources found for "{task}". Try another task.</p>
                )}
            </div>
        </div>
    );
}
