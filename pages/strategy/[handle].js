import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StrategyPage() {
  const router = useRouter();
  const { handle } = router.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!handle) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(`/data/strategies/${handle}.json`);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError('Strategy data not found.');
        setLoading(false);
      }
    };
    fetchData();
  }, [handle]);

  const stats = {
    total: data.length,
    loudioCount: data.filter(d => d.containsLoudio).length,
    uniqueHashtags: [...new Set(data.flatMap(d => d.hashtags))].length,
    uniqueMentions: [...new Set(data.flatMap(d => d.mentions))].length,
  };

  return (
    <div className="container">
      <header className="header header-row">
        <img src="/loudion.png" alt="Loudions Logo" className="loudion-logo" />
        <div>
          <h1>👽Strategy of <span style={{ color: '#9fff43' }}>@{handle}</span></h1>
          <p>All activity and statistics for <b>@{handle}</b> based on posts from last 24 hours.</p>
        </div>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          <div className="card" style={{ marginBottom: "2rem" }}>
            <h2 style={{ color: "#9fff43", fontSize: "1.5rem", marginBottom: "1rem" }}>📊 Statistics of last 24 hours</h2>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", padding: 0, listStyle: "none" }}>
              <li><b>Total Tweets:</b> {stats.total}</li>
              <li><b>🔥Loudio Mentions:</b> {stats.loudioCount}</li>
              <li><b>Hashtags:</b> {stats.uniqueHashtags}</li>
              <li><b>Mentions:</b> {stats.uniqueMentions}</li>
            </ul>
          </div>

          <div className="card">
            <h2 style={{ color: "#9fff43", fontSize: "1.5rem", marginBottom: "1rem" }}>📜 Recent Tweets</h2>
            <ul style={{ padding: 0, listStyle: "none" }}>
              {[...data]
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map((tweet, idx) => (
                <li
                  key={idx}
                  style={{
                    borderBottom: "1px solid #292929",
                    paddingBottom: "1.2rem",
                    marginBottom: "1.2rem"
                  }}
                >
                  <a
                    href={tweet.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#9fff43",
                      textDecoration: "underline",
                      wordBreak: "break-all",
                      fontWeight: 600,
                    }}
                  >
                    {tweet.link}
                  </a>
                  <div style={{ fontSize: "0.93rem", marginTop: "0.2rem", color: "#a1a1aa" }}>
                    ⏱ {new Date(tweet.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })} (UTC)
                  </div>
                  <div style={{ marginTop: "0.5rem", fontSize: "0.97rem" }}>
                    {tweet.containsLoudio && (
                      <span style={{ marginRight: 8, color: "#38d85c", fontWeight: 700 }}>🔊 Mentions "loudio"</span>
                    )}
                    {tweet.hashtags.length > 0 && (
                      <span style={{ marginRight: 8, color: "#8fd7e7" }}>
                        🏷 Hashtags: {tweet.hashtags.join(', ')}
                      </span>
                    )}
                    {tweet.mentions.length > 0 && (
                      <span style={{ color: "#ffe066" }}>
                        👥 Mentions: {tweet.mentions.join(', ')}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
