import { useState, useEffect } from 'react';
import './LearningResources.css'; // Import the shared styles

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
        <div className="resources-container">
            <h2 className="resources-title">
                {loading ? "Loading Resources..." : `Explore & Learn: Recommended Resources- ${task}`}
            </h2>

            {(!loading && arxivPapers.length === 0 && models.length === 0) && (
                <p className="no-resources">No resources found for "{task}". Try another task.</p>
            )}

            {arxivPapers.length > 0 && (
                <div className="resource-group">
                    <h3 className="group-title">📄 Latest Papers (ArXiv)</h3>
                    <ul>
                        {arxivPapers.map(paper => (
                            <li key={paper.link}>
                                <a href={paper.link} target="_blank" rel="noreferrer">
                                    {paper.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {models.length > 0 && (
                <div className="resource-group">
                    <h3 className="group-title">🤖 HuggingFace Models</h3>
                    <ul>
                        {models.map(model => (
                            <li key={model.link}>
                                <a href={model.link} target="_blank" rel="noreferrer">
                                    {model.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
