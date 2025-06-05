import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTopUsers() {
      try {
        const response = await fetch('/api/top25');
        if (!response.ok) throw new Error('Backend error');
        const data = await response.json();
        console.log("✅ Top users fetched:", data);
        setTopUsers(data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchTopUsers();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>LOUD Top 25 Analyzer</title>
      </Head>

      <header className="header">
        <h1>🚀 LOUD Top 25 Analyzer</h1>
        <p>Discover what the top $LOUD influencers are doing to stay ahead.</p>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section className="grid">
        {topUsers.map((user, index) => (
          <div className="card" key={index}>
            <div className="flex items-center gap-3 mb-2">
              <img
                src={user.avatar || `https://unavatar.io/twitter/${user.handle}`}
                alt="Avatar"
                className="avatar"
              />
              <div>
                <h2 className="text-lg font-bold">
                  #{index + 1} {user.username}
                </h2>
                <div className="text-sm text-gray-600">
                  {index === 0 ? '🥇 Top 1' : index === 1 ? '🥈 Top 2' : index === 2 ? '🥉 Top 3' : '🎯'}
                </div>
              </div>
            </div>

            <p><strong>Mindshare:</strong> {user.mindshare}</p>
            <p><strong>24h Change:</strong> {user.change}</p>
            <p><strong>Earnings:</strong> {user.earnings ? user.earnings.replace(/\s?\$/, ' ($') + ')' : 'N/A'}</p>

            <a
              className="button"
              href={`https://twitter.com/${user.handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on X 
            </a>

            <a
              className="button"
              style={{ backgroundColor: '#dc2626', marginTop: '8px' }}
              href={`/strategy/${user.handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Check Strategy 🔥
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}
