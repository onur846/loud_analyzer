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
    <div className="min-h-screen bg-black text-white px-6 py-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-lime-400 transition-all duration-300 ease-in-out transform hover:scale-105">
          Strategy of <span className="text-white">@{handle}</span>
        </h1>

        {loading ? (
          <p className="text-center text-lg animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="space-y-8">
            <div className="bg-gray-900 p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold mb-4 text-lime-300">📊 Strategy Stats</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <li>Total Tweets: <span className="text-lime-400">{stats.total}</span></li>
                <li>Loudio Mentions: <span className="text-lime-400">{stats.loudioCount}</span></li>
                <li>Unique Hashtags: <span className="text-lime-400">{stats.uniqueHashtags}</span></li>
                <li>Unique Mentions: <span className="text-lime-400">{stats.uniqueMentions}</span></li>
              </ul>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out">
              <h2 className="text-2xl font-semibold mb-4 text-lime-300">📜 Recent Tweets</h2>
              <ul className="space-y-6">
                {data.map((tweet, idx) => (
                  <li key={idx} className="border-b border-gray-700 pb-6 hover:bg-gray-800 transition-all duration-300 ease-in-out">
                    <a href={tweet.link} target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:underline break-all">
                      {tweet.link}
                    </a>
                    <p className="text-sm mt-2 text-gray-400">⏱ {new Date(tweet.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })} (UTC)</p>
                    <div className="mt-3 text-sm">
                      {tweet.containsLoudio && <span className="mr-2 text-green-400">🔊 Mentions "loudio"</span>}
                      {tweet.hashtags.length > 0 && <span className="mr-2">🏷 Hashtags: {tweet.hashtags.join(', ')}</span>}
                      {tweet.mentions.length > 0 && <span>👥 Mentions: {tweet.mentions.join(', ')}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
