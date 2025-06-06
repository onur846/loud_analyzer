import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StrategyPage() {
  const router = useRouter();
  const { handle } = router.query;
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile info for the user (from Twitter or your API, fallback to handle)
  useEffect(() => {
    if (!handle) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://unavatar.io/twitter/${handle}`);
        setProfile(res.data);
      } catch {
        setProfile({ url: `https://twitter.com/${handle}` });
      }
    };
    fetchProfile();
  }, [handle]);

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
    <div className="strategy-bg min-h-screen min-w-full font-sans pb-8">
      {/* Sticky Top Nav */}
      <nav className="w-full flex items-center justify-between px-6 py-5 bg-[#111827]/80 backdrop-blur z-50 sticky top-0 left-0 border-b border-[#232a38]">
        <a href="/" className="flex items-center gap-3">
          <img src="/loudion.png" alt="Loudions Logo" className="h-11 w-11 rounded-full" />
          <span className="font-bold text-xl text-lime-400">Loudions</span>
        </a>
        <div className="flex gap-6">
          <a href="/" className="text-gray-300 hover:text-lime-400 font-semibold transition">Home</a>
          <span className="text-lime-300 font-semibold">Strategy</span>
        </div>
      </nav>

      {/* Profile Bar */}
      <div className="max-w-3xl mx-auto mt-8 flex items-center gap-5 bg-[#18181b]/80 rounded-xl p-5 shadow-xl">
        <img
          src={profile?.avatar || `https://unavatar.io/twitter/${handle}`}
          alt="Avatar"
          className="h-16 w-16 rounded-full shadow"
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl text-white">@{handle}</span>
            <a
              href={`https://twitter.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded px-3 py-1 text-sm ml-2 transition"
            >
              View on X
            </a>
          </div>
          <div className="text-gray-400 text-base mt-1">
            {profile?.name ? profile.name : "Top LOUD participant"}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto mt-8 space-y-8">
        {loading ? (
          <p className="text-center text-lg animate-pulse text-gray-400 mt-16">Loading strategy...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            {/* Stats */}
            <div className="flex flex-wrap gap-5 justify-between bg-[#21222c]/80 backdrop-blur rounded-xl px-8 py-7 shadow-xl">
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <span className="text-lg text-gray-400">Total Tweets</span>
                <span className="font-bold text-2xl text-lime-400">{stats.total}</span>
              </div>
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <span className="text-lg text-gray-400">Loudio Mentions</span>
                <span className="font-bold text-2xl text-green-400">{stats.loudioCount}</span>
              </div>
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <span className="text-lg text-gray-400">Unique Hashtags</span>
                <span className="font-bold text-2xl text-cyan-400">{stats.uniqueHashtags}</span>
              </div>
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <span className="text-lg text-gray-400">Unique Mentions</span>
                <span className="font-bold text-2xl text-blue-300">{stats.uniqueMentions}</span>
              </div>
            </div>

            {/* Tweets */}
            <div className="bg-[#18181b]/80 rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-lime-300 mb-4">📜 Recent Tweets</h2>
              <ul className="space-y-7">
                {data.map((tweet, idx) => (
                  <li
                    key={idx}
                    className="rounded-lg border border-[#232a38] bg-[#22232a] px-5 py-4 transition hover:bg-[#232735] hover:scale-[1.01] shadow flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {tweet.containsLoudio && (
                        <span className="inline-block text-green-400 font-bold text-lg">🔊 loudio</span>
                      )}
                      <a
                        href={tweet.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-300 hover:underline text-xs font-mono ml-auto"
                      >
                        {new Date(tweet.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })} (UTC)
                      </a>
                    </div>
                    <a
                      href={tweet.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-400 hover:underline break-all text-sm font-semibold"
                    >
                      {tweet.link}
                    </a>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      {tweet.hashtags.length > 0 && (
                        <span className="text-xs text-gray-400">
                          🏷 Hashtags: <span className="text-gray-200">{tweet.hashtags.join(', ')}</span>
                        </span>
                      )}
                      {tweet.mentions.length > 0 && (
                        <span className="text-xs text-gray-400">
                          👥 Mentions: <span className="text-gray-200">{tweet.mentions.join(', ')}</span>
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
